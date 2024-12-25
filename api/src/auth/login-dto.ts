// create-leave.dto.ts
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinDate,
} from 'class-validator';

export class LoginDto {
  @IsEmail(
    {
      require_tld: true,
    },
    { message: 'Email tidak valid' },
  )
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  password: string;
}
