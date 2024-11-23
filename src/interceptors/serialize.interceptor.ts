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
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    return handler.handle().pipe(map((data: any) => {}));
  }
}
