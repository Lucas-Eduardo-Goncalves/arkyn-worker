import { formatToEllipsis } from "@arkyn/shared";
import { Consumer, Kafka } from "kafkajs";
import { hostname } from "os";
import { environmentVariables } from "../../main/config/environmentVariables";

const TOPIC_INGEST = "ingest-logs";
const TOPIC_DELETE = "cleanup-logs";

type TopicType = typeof TOPIC_INGEST | typeof TOPIC_DELETE;

class QueueService {
  private static kafka = new Kafka({
    clientId: `arkyn-worker-${hostname()}`,
    brokers: [environmentVariables.MICRO_QUEUE_IP],
  });

  private static async initializeTopics() {
    const admin = this.kafka.admin();
    await admin.connect();

    const topics = await admin.listTopics();
    const topicsToCreate = [TOPIC_INGEST, TOPIC_DELETE].filter(
      (topic) => !topics.includes(topic)
    );

    if (topicsToCreate.length > 0) {
      await admin.createTopics({
        topics: topicsToCreate.map((topic) => ({ topic, numPartitions: 1 })),
      });
    }

    await admin.disconnect();
  }

  static async initialize() {
    await this.initializeTopics();
  }

  static async createConsumer(topic: TopicType) {
    const consumer = this.kafka.consumer({ groupId: `arkyn-${topic}-workers` });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: false });
    return consumer;
  }

  static async run(
    consumer: Consumer,
    eachMessage: (message: string, key: string) => Promise<void>
  ) {
    await consumer.run({
      eachMessage: async (props) => {
        const message = props.message?.value?.toString() || "MESSAGE_EMPTY";
        const key = formatToEllipsis(message, 10);
        await eachMessage(message, key);
      },
    });
  }
}

export { QueueService };
