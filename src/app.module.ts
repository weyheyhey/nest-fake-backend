import { APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from "@nestjs/common";

import { TransformInterceptor } from "./shared/interceptors";

import { AppController } from "./app.controller";
import { AccountModule } from "./account/account.module";
import { FakeModule } from "./fake/fake.module";

@Module({
  imports: [AccountModule, FakeModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
