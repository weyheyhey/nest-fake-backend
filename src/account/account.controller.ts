import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiForbiddenResponse } from "@nestjs/swagger";
import { Body, Controller, Post, UsePipes, HttpCode, Get } from "@nestjs/common";

import { ValidationPipe } from "../shared/pipes";

import { RegisterAccountDto } from "./dto";
import { RegistrationService } from "./services";

@ApiTags("account")
@Controller("account")
export class AccountController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post("register")
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({ description: "Successful operation" })
  @ApiBadRequestResponse({ description: "Input data validation failed" })
  @ApiForbiddenResponse({ description: "Blocked account | Maximum number attempts exceeded" })
  register(@Body() registerDto: RegisterAccountDto) {
    return this.registrationService.registerNewUser(registerDto.phone);
  }

  @Get("reset")
  @ApiOkResponse({ description: "Reset all accounts attempts" })
  reset() {
    this.registrationService.resetCache();

    return "cache cleaned";
  }
}
