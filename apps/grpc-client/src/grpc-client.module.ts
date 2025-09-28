import { Module } from '@nestjs/common';
import { GrpcClientController } from './grpc-client.controller';
import { GrpcClientService } from './grpc-client.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'node:path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_GRPC_CLIENT', //  客户端名称，注入时用
        transport: Transport.GRPC,
        options: {
          package: 'order',
          protoPath: join(__dirname, './proto/order.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
  ],
  controllers: [GrpcClientController],
  providers: [GrpcClientService],
})
export class GrpcClientModule {}
