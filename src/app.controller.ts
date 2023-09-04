import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { User as UserPrisma} from '@prisma/client';
import { User } from './decorators/user.decorator';
import { EraseDto } from './dto/erase.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  getHello(): string {
    return this.appService.getHello();
  }
  
  @UseGuards(AuthGuard)
  @Delete("/erase")
  async erase(@Body() eraseDto:EraseDto,@User() user:UserPrisma){
    return await this.appService.erase(eraseDto,user.id)
  }
}
