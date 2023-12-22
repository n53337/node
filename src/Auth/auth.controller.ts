import { Body, Controller, Get, Ip, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  hello(): string {
    return 'Hello World';
  }

  @Post()
  helloPost(@Ip() ip: any, @Body() body: any): string {
    console.log(body, '\n', ip);
    return 'u signed up';
  }
}
