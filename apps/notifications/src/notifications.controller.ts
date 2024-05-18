import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @MessagePattern('notifications.signup')
  getHello() {
    console.log('Hello World!')
    return { message: 'Hello World!' }
  }
}
