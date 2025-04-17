import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

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
  //Tìm người dùng theo email để đăng nhập
  async findByEmail(email: string) {
    const user = this.userRepository.findOneBy({ email });
    return user;
  }
  //xác thực người dùng
  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    // Kiểm tra xem mật khẩu có được mã hóa hay không
    let isPasswordValid: boolean;
    // Nếu mật khẩu đã được mã hóa, so sánh bằng bcrypt
    if (user.password.startsWith('$2y$') || user.password.startsWith('$2b$')) {
      isPasswordValid = bcrypt.compareSync(password, user.password);
    } else {
      // Nếu mật khẩu chưa được mã hóa, so sánh trực tiếp
      isPasswordValid = password === user.password;
    }
    if (!isPasswordValid) {
      throw new NotFoundException(`Password is incorrect`);
    }
    return user;
  }
  //Thêm người dùng
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    //mã khoá mật khẩu
    const hashpw = await bcrypt.hash(createUserDto.password, 10);
    user.password = hashpw;
    //kiểm tra xem email đã tồn tại chưa
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new NotFoundException(
        `Email ${createUserDto.email} already exists`,
      );
    }
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
