import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller("fake")
export class FakeController {
  @Get("news")
  @HttpCode(200)
  fake() {
    return {
      username: "admin",
      password: "qwerty",
    };
  }
}
