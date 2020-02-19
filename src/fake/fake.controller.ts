import { Controller, Get, HttpCode } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";

@ApiTags("fake")
@Controller("fake")
export class FakeController {
  @Get("news")
  @HttpCode(200)
  @ApiOkResponse({ description: "Successful operation" })
  fake() {
    return {
      username: "admin",
      password: "qwerty",
    };
  }
}
