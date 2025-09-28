import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

// 定义 gRPC 服务接口 和 proto 里的 OrderService 一致
interface OrderServiceClient {
  getUserOrders(data: { userId: number }): Observable<{ orders: any[] }>;
}

@Injectable()
export class GrpcClientService implements OnModuleInit {
  private orderServiceClient: OrderServiceClient;

  // 注入全局 gRPC 客户端
  constructor(@Inject('ORDER_GRPC_CLIENT') private client: ClientGrpc) {}

  // 获取 OrderService 实例
  onModuleInit() {
    this.orderServiceClient =
      this.client.getService<OrderServiceClient>('OrderService');

    console.log('orderServiceClient->', this.orderServiceClient);
  }

  async getUserWithOrders(userId: number) {
    try {
      const res = await firstValueFrom(
        this.orderServiceClient.getUserOrders({
          userId,
        }),
      );
      return { userId, username: `用户${userId}`, orders: res.orders };
    } catch (err) {
      if (err instanceof RpcException) {
        // 判断是否是 gRPC 错误
        // 根据错误码做处理
      }
    }
  }
}
