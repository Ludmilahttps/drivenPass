import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, JwtModule.register({secret:process.env.JWT_SECRET})],
  exports:[AuthService]
})
export class AuthModule {}
