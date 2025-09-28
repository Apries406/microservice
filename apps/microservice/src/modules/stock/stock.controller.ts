import { Controller } from '@nestjs/common';
import { StockService } from './stock.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  // 订阅 order_created 事件，收到后减少库存
  @EventPattern('order_created')
  handleOrderCreated(order: any) {
    console.log('收到订单 减少库存');
  }
}
