import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrderModule } from './modules/order/order.module';
import { join } from 'path';

/* async function bootstrap() {
  const microApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.KAFKA,
      options: {},
    },
  );
  await microApp.listen();
  console.log('订单服务 TCP 服务端已经启动成功, 监听port 3001');

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('订单服务 HTTP 服务端已经启动成功, 监听port 3000');
}
bootstrap(); */

/* async function startBareKafka() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'order', // 给当前服务起一个唯一的 ID
          brokers: ['localhost:9092'], //  kafka 服务器的地址，集群的话填多个，用逗号隔开
        },
        consumer: {
          groupId: 'order-consumer', // 消费者组 ID，同一组的消费者不会重复消费
          allowAutoTopicCreation: true, // 允许自动创建 topic
        },
      },
    },
  );
  await app.listen();
  console.log('Kafka 订单服务 纯微服务启动成功 监听端口 9092');
}

startBareKafka();
 */

/* async function startMixinKafkaAndHTTPApp() {
  // 1. 先创建 HTTP 服务应用，也就是启动一个正常的 Nest 服务
  const app = await NestFactory.create(AppModule);

  // 2. 再添加 Kafka 微服务
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'order', // 给当前服务起一个唯一的 ID
        brokers: ['localhost:9092'], //  kafka 服务器的地址，集群的话填多个，用逗号隔开
      },
      consumer: {
        groupId: 'order-consumer', // 消费者组 ID，同一组的消费者不会重复消费
        allowAutoTopicCreation: true, // 允许自动创建 topic
      },
    },
  });

  // 3. 启动 HTTP 服务和 Kafka 微服务
  await app.startAllMicroservices();
  await app.listen(3003);
  console.log('订单服务 HTTP 服务端已经启动成功, 监听port 3003');
}

startMixinKafkaAndHTTPApp(); */

/* async function startGRPCOnly() {
  console.log('地址-->', join(__dirname, './src/proto/order.proto'));
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'order', // 对应 proto 文件中的 package 名
        protoPath: join(__dirname, './proto/order.proto'), // 对应 proto 文件的路径
        url: 'localhost:50051', // gRPC 服务端地址，默认端口 50051
      },
    },
  );

  await app.listen();
  console.log('gRpc 服务端(订单服务) 启动：localhost:50051');
}

startGRPCOnly();
 */

async function startGRPCAndHTTP() {
  // 1. 先创建 HTTP 服务
  const app = await NestFactory.create(AppModule);

  // 再添加 gRPC 服务
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'order', // 对应 proto 文件中的 package 名
      protoPath: join(__dirname, './proto/order.proto'), // 对应 proto 文件的路径
      url: 'localhost:50051', // gRPC 服务端地址，默认端口 50051
    },
  });

  // 3. 启动 HTTP 服务和 gRPC 微服务
  await app.startAllMicroservices();
  await app.listen(3003);
  console.log('订单服务 HTTP 服务端已经启动成功, 监听port 3003');
}
startGRPCAndHTTP();
