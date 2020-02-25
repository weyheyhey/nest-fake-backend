import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthByPhoneDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;
}
