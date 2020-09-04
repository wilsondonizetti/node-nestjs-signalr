import { Controller, Get, Put, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Put(['teste/path2', 'test'])
  putHello(@Body() body: any): string {    
    console.log('body',body.value);
    return `${this.appService.getHello()} - ${body.value}`;
  }
}
