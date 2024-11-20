import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { IsEmail, IsStrongPassword } from 'class-validator';

@Injectable()
export class UsersService {
  //@InjectRepository(User) 告訴 NestJS 自動注入 User 對應的 Repository
  //依賴注入 @InjectRepository 裝飾器，用來將 TypeORM 的 Repository 注入

  //repo: Repository<User> 作為服務的私有屬性，可以直接使用 repo 來操作 User 資料表
  //repo 為Repository處理User的實例
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
}
