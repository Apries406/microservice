import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  // constructor(
  //   @Inject('ORDER_SERVICE') private client: ClientProxy,
  //   @Inject('KAFKA_CLIENT') private kafkaClient: ClientProxy,
  // ) {}
  // createOrder(order: any) {
  //   // 发出事件：order_created 携带信息 order
  //   this.client.emit('order_created', order).subscribe();
  //   return '订单创建成功';
  // }
}
