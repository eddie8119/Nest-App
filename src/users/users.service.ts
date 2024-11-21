import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

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
    //直接save物件 而不是實例:
    //也可以在這裡直接存 但就無法經過entity的validation
    //no hooks get executed
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }
  // findOne: 回傳 one record or null
  // find: 回傳 return an array 匹配的所有不同記錄
  find(email: string) {
    return this.repo.find({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    // 技巧: attrs: Partial 部分屬性
    const user = await this.findOne(id);
    if (!user) throw new Error('user not found');
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new Error('user not found');
    return this.repo.remove(user);
  }
}
