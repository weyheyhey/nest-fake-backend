import { Module } from "@nestjs/common";

import { RegistrationService } from "./services";

import { AccountController } from "./account.controller";

@Module({
  controllers: [AccountController],
  providers: [RegistrationService],
})
export class AccountModule {}
