import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // ClientsModule.register([
    //   { name: 'ORDER_SERVICE', transport: Transport.TCP },
    // ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
