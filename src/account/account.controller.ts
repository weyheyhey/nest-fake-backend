import { Body, Controller, Post, UsePipes, HttpCode, Get } from "@nestjs/common";

import { ValidationPipe } from "../shared/pipes";

import { RegisterAccountDto } from "./dto";
import { RegistrationService } from "./services";

@Controller("account")
export class AccountController {
  constructor(private readonly registrationService: RegistrationService) {}

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post("register")
  register(@Body() registerDto: RegisterAccountDto) {
    return this.registrationService.registerNewUser(registerDto.phone);
  }

  @Get()
  reset() {
    this.registrationService.resetCache();

    return "cache cleaned";
  }
}
