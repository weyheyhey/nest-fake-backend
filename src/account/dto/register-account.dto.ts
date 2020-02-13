import { IsNotEmpty } from "class-validator";

import { DoesMatch } from "../../shared/validators";

export class RegisterAccountDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  @DoesMatch("password")
  readonly password_confirm: string;
}
