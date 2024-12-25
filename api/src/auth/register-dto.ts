import { IsDate, IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import e from 'express';

export class RegisterDto {
  @IsNotEmpty({ message: 'Nama depan tidak boleh kosong' })
  firstName: string;

  @IsNotEmpty({ message: 'Nama belakang tidak boleh kosong' })
  lastName: string;

  @IsEmail(
    {
      require_tld: true,
    },
    { message: 'Email tidak valid' },
  )
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @Length(6, 20, { message: 'Password minimal 6 karakter' })
  password: string;

  @IsNotEmpty({ message: 'Tanggal lahir tidak boleh kosong' })
  // @IsDate({ message: 'Tanggal lahir tidak valid, format: YYYY-MM-DD' })
  birthDate: Date;

  @IsNotEmpty({ message: 'Jenis kelamin tidak boleh kosong' })
  @IsEnum(['male', 'female'], { message: 'Jenis kelamin tidak valid' })
  gender: string;
}
