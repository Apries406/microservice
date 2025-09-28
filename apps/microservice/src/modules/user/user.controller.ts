import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId/orders')
  async getUserOrders(@Param('userId') userId: number) {
    return this.userService.getUserWithOrders(userId);
  }
}
