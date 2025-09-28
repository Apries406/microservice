import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  private orderClient: ClientProxy;
  constructor() {
    this.orderClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    });
  }

  async getUserWithOrders(userId: number) {
    // 发请求：调用 get_user_orders 方法，传 userId，等返回结果
    const orders = await lastValueFrom(
      // 转 promise, 相当于 rxjs6 的 .toPromise()
      this.orderClient.send('ger_user_orders', userId),
    );

    return {
      user_id: userId,
      username: '张三',
      orders,
    };
  }
}
