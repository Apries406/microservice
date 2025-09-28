import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './modules/order/order.module';
import { StockModule } from './modules/stock/stock.module';
import { UserModule } from './modules/user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // ClientsModule.registerAsync([
    //   {
    //     name: 'KAFKA_CLIENT', // 客户端名称，注入时用
    //     useFactory: () => ({
    //       transport: Transport.KAFKA,
    //       options: {
    //         client: {
    //           clientId: 'global-kafka-client',
    //           brokers: ['localhost:9092'],
    //           // 生产者就不需要 consumer 配置
    //         },
    //       },
    //     }),
    //   },
    // ]),
    OrderModule,
    StockModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // exports: ['KAFKA_CLIENT'], // 关键：导出 Kafka 客户端，供子模块使用
})
export class AppModule {}
