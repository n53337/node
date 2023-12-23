import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  hello(): string {
    return 'Hello World';
  }

  @Post('signup')
  async signUp(@Body() body: SignupDto) {
    const user = await this.authService.signup(body);
    return { message: 'user created successfully', user };
  }

  @Post('signin')
  async signIn(@Body() body: LoginDto) {
    const user = await this.authService.login(body);
    return { message: 'logged in successfully', user };
  }
}
