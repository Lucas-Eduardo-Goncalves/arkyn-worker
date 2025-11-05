import { Consumer, Kafka } from "kafkajs";
import { hostname } from "os";
import { environmentVariables } from "../../main/config/environmentVariables";
import { formatToEllipsis } from "@arkyn/shared";

const TOPIC = "arkyn-tasks";

class QueueService {
  static consumer: Consumer;

  static async initializeTopic() {
    const kafka = new Kafka({
      clientId: `arkyn-worker-${hostname()}`,
      brokers: [environmentVariables.MICRO_QUEUE_IP],
    });

    const admin = kafka.admin();

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
    const kafka = new Kafka({
      clientId: `arkyn-worker-${hostname()}`,
      brokers: [environmentVariables.MICRO_QUEUE_IP],
    });

    this.consumer = kafka.consumer({ groupId: "arkyn-workers" });
    await this.consumer.connect();
    await this.initializeTopic();
  }

  static validateInitialization() {
    if (!this.consumer)
      throw new Error("Consumer not initialized. Call initialize() first.");
  }

  static async subscribe(topic: string) {
    this.validateInitialization();
    await this.consumer.subscribe({ topic, fromBeginning: false });
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
