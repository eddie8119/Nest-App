import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

//implements:
// NestInterceptor 是 NestJS 的攔截器標準介面，通常用來改變控制器方法的輸入或輸出。
// 須實現 NestInterceptor 介面定義的所有方法，這裡是 intercept 方法
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>, //物件 代表控制器方法的邏輯處理
  ): Observable<any> {
    return handler.handle().pipe(
      //pipe()處理資料流
      map((data: any) => {
        //自動將其轉換為 Json
        return plainToClass(this.dto, data, {
          //UserDto實例 有序列化規則
          excludeExtraneousValues: true,
          //過濾掉未在 UserDto 類別中使用 @Expose() 標記的屬性
        });
      }),
    );
  }
}
