import * as amqp from "amqplib/callback_api";
import { User, NotificationType } from "@prisma/client";

export interface IEventData {
  notification: {
    type: NotificationType;
    user: User;
    data: {
      // eslint-disable-next-line
      [key: string]: any;
    };
  };
}

let connection: amqp.Connection;
function connect(): Promise<amqp.Connection> {
  return new Promise((resolve, reject) => {
    amqp.connect("amqp://localhost", (err, con) => {
      if (err) reject(err);
      else resolve(con);
    });
  });
}

export async function consume(
  queue: keyof IEventData,
  cb: (data: IEventData[typeof queue]) => void
) {
  if (!connection) connection = await connect();

  connection.createChannel((err, channel) => {
    if (err) throw err;

    channel.assertQueue(`REMARK:${queue}`, {
      durable: false,
    });

    channel.consume(
      `REMARK:${queue}`,
      (msg) => {
        if (msg == null) return;
        const data = JSON.parse(msg.content.toString());
        cb(data);
      },
      {
        noAck: true,
      }
    );
  });
}

export async function sendToQueue(
  queue: keyof IEventData,
  message: IEventData[typeof queue]
) {
  if (!connection) connection = await connect();

  connection.createChannel((err, channel) => {
    if (err) throw err;

    channel.assertQueue(`REMARK:${queue}`, {
      durable: false,
    });

    channel.sendToQueue(
      `REMARK:${queue}`,
      Buffer.from(JSON.stringify(message))
    );
  });
}
