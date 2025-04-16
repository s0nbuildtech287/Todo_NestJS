import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  //các phương thức CRUD

  //Lấy tất cả người dùng
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  //Lấy người dùng theo id
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  //Thêm người dùng
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return this.userRepository.save(user);
  }
  //cập nhật thông tin người dùng
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      id: parseInt(id),
    });
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    // Cập nhật các thuộc tính từ DTO vào existingUser
    Object.assign(existingUser, updateUserDto);
    existingUser.updatedAt = new Date();
    return this.userRepository.save(existingUser);
  }
  //xóa người dùng theo id
  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.remove(user);
  }
}
