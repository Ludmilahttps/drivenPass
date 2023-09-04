import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository} from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository:UsersRepository){}
  async create(createUserDto: CreateUserDto) {
    const {email}=createUserDto
    const user=await this.usersRepository.getUserByEmail(email)
    if(user) throw new ConflictException()

    return await this.usersRepository.createUser(createUserDto)
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
