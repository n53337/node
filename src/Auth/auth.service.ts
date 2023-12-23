import {
   BadRequestException,
   ForbiddenException,
   Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignupDto } from './dto';
import argon2 = require('argon2');
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
   constructor(private readonly prisma: PrismaService) {}

   // Register new user workfow
   async signup(creds: SignupDto): Promise<User> {
      // Hash password
      const hashedPwd = await argon2.hash(creds.password);

      // save user to DB
      try {
         const user = await this.prisma.user.create({
            data: {
               email: creds.email,
               name: creds.name,
               pwd: hashedPwd,
            },
         });
         delete user.pwd;

         return user;
      } catch (error: unknown) {
         throw new BadRequestException(`Error: Cannot complete this operation`);
      }
   }

   // Login a user
   async login(creds: LoginDto): Promise<User> {
      // find user
      const user = await this.prisma.user.findUnique({
         where: {
            email: creds.email,
         },
      });

      if (!user)
         throw new ForbiddenException('Forbidden Request Error', {
            description: 'this email is not exist',
         });

      const isValidPwd = await argon2.verify(user.pwd, creds.password);
      if (!isValidPwd)
         throw new ForbiddenException('Forbidden Request', {
            description: 'wrong password',
         });

      delete user.pwd;

      return user;
   }
}
