import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  GrpcMethod,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
// 定义类型 和 proto 文件的保持一致
interface GetUserOrdersRequest {
  userId: number; //对应 proto 里的 user_id ，Nest 会自动将请求体中的 user_id 映射到到驼峰
}

interface Order {
  orderId: number;
  userId: number;
  goodsId: number;
  amount: number;
  status: string;
}

interface GetUserOrdersResponse {
  orders: Order[];
}

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  /* 
  @MessagePattern('get_user_orders')
  getUserOrders(userId: number) {
    return [
      {
        order_id: 1,
        user_id: userId,
        goods_id: 101,
      },
      {
        order_id: 2,
        user_id: userId,
        goods_id: 102,
      },
    ];
  }
 */
  @GrpcMethod('OrderService', 'GetUserOrders')
  getUserOrders(request: GetUserOrdersRequest): GetUserOrdersResponse {
    const { userId } = request;
    // 1. 参数错误： 用户 ID 小于 1
    if (userId < 1) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT, // gRPC 错误码: 参数无效
        message: `用户 ID ${userId} 无效(必须 > 0)`,
      });
    }

    const mockOrders = [
      {
        orderId: 1,
        userId: 123,
        goodsId: 101,
        amount: 1,
        status: 'PAId',
      },
      {
        orderId: 2,
        userId: 123,
        goodsId: 102,
        amount: 2,
        status: 'PAID',
      },
      {
        orderId: 3,
        userId: 456,
        goodsId: 103,
        amount: 3,
        status: 'PENDING',
      },
    ];

    const userOrders = mockOrders.filter(
      (order) => order.userId === request.userId,
    );

    // 2. 参数不存在：用户没有订单
    if (userOrders.length === 0) {
      throw new RpcException({
        code: status.NOT_FOUND, // gRPC 错误码: 未找到
        message: `用户 ID ${userId} 没有订单`,
      });
    }

    return {
      orders: userOrders,
    };
  }
}
