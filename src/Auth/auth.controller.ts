import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  hello(): string {
    return 'Hello World';
  }

  @Post('login')
  login(@Body() body: LoginDto): string {
    console.log(body);
    return 'u signed up';
  }
}
