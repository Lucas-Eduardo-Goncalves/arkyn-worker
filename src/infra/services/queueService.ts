import { formatToEllipsis } from "@arkyn/shared";
import { Consumer, Kafka } from "kafkajs";
import { hostname } from "os";
import { environmentVariables } from "../../main/config/environmentVariables";

const TOPIC = "ingest-queue";

class QueueService {
  static kafka = new Kafka({
    clientId: `arkyn-worker-${hostname()}`,
    brokers: [environmentVariables.MICRO_QUEUE_IP],
  });

  static consumer: Consumer;

  static async initializeTopic() {
    const admin = this.kafka.admin();
    await admin.connect();

    const topics = await admin.listTopics();
    const hasTopic = topics.includes(TOPIC);

    if (!hasTopic) {
      await admin.createTopics({
        topics: [{ topic: TOPIC, numPartitions: 1 }],
      });
    }

    await admin.disconnect();
  }

  static async initialize() {
    await this.initializeTopic();
    this.consumer = this.kafka.consumer({ groupId: "arkyn-workers" });
    await this.consumer.connect();
  }

  static validateInitialization() {
    if (!this.consumer) {
      throw new Error("Consumer not initialized. Call initialize() first.");
    }
  }

  static async subscribe() {
    this.validateInitialization();
    await this.consumer.subscribe({ topic: TOPIC, fromBeginning: false });
  }

  static async run(
    eachMessage: (message: string, key: string) => Promise<void>
  ) {
    this.validateInitialization();

    await this.consumer.run({
      eachMessage: async (props) => {
        const message = props.message?.value?.toString() || "MESSAGE_EMPTY";
        const key = formatToEllipsis(message, 10);
        await eachMessage(message, key);
      },
    });
  }
}

export { QueueService };
