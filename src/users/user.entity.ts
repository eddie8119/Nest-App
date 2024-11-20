import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity() 裝飾器是 TypeORM 進行 ORM 映射的基礎，將類別與資料庫結構對應起來。
// 類別映射到資料庫中的表，可以以物件導向的方式操作資料庫
@Entity()
export class User {
  //注意User取名規範
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // hook的用法
  // @AfterInsert()
  // logInsert(){}
}
