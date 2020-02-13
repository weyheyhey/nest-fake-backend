import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

export interface Response<T> {
  data: T;
  message: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        message: "Success response",
        data,
      })),
    );
  }
}
