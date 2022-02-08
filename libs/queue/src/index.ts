import * as amqp from "amqplib/callback_api";

const prefix = "REMARK";
let connection: amqp.Connection;

interface IData {
  // eslint-disable-next-line
  [key: string]: any;
}

function connect(): Promise<amqp.Connection> {
  return new Promise((resolve, reject) => {
    amqp.connect("amqp://localhost", (err, con) => {
      if (err) reject(err);
      else resolve(con);
    });
  });
}

export async function consume(queue: string, cb: (data: IData) => void) {
  if (!connection) connection = await connect();

  connection.createChannel((err, channel) => {
    if (err) throw err;

    channel.assertQueue(`${prefix}:${queue}`, {
      durable: false,
    });

    channel.consume(
      `${prefix}:${queue}`,
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

export async function sendToQueue(queue: string, message: IData) {
  if (!connection) connection = await connect();

  connection.createChannel((err, channel) => {
    if (err) throw err;

    channel.assertQueue(`${prefix}:${queue}`, {
      durable: false,
    });

    channel.sendToQueue(
      `${prefix}:${queue}`,
      Buffer.from(JSON.stringify(message))
    );
  });
}
