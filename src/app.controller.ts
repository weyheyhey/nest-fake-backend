import { Get, Controller } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";

@ApiTags("entry")
@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({ description: "Ping" })
  getHello(): string {
    return "Hello World!";
  }
}
