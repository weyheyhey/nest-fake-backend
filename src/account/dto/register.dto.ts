import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import { DoesMatch } from "../../shared/validators";

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly phone: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @DoesMatch("password")
  @ApiProperty()
  readonly password_confirm: string;
}
