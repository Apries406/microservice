import { Controller, Get, Param } from '@nestjs/common';
import { GrpcClientService } from './grpc-client.service';

@Controller()
export class GrpcClientController {
  constructor(private readonly grpcClientService: GrpcClientService) {}

  @Get(':userId/orders')
  async getUserOrders(@Param('userId') userId: string) {
    return this.grpcClientService.getUserWithOrders(+userId); // 转成数字
  }
}
