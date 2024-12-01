import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Username no puede estar vacio' })
  @IsString({ message: 'Username no es válido' })
  username: string;

  @IsEmail({}, { message: 'Email no es válido' })
  @IsNotEmpty({ message: 'Email no puede estar vacio' })
  email: string;

  @IsString({ message: 'Password no es válido' })
  @IsNotEmpty({ message: 'Password no puede ser vacio' })
  @Matches(/(?=.*[a-z])/, {
    message: 'La password debe tener al menos una letra minúscula.',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'La password debe tener al menos una letra mayúscula.',
  })
  @Matches(/(?=.*\d)/, {
    message: 'La password debe incluir al menos un número.',
  })
  @Matches(/[a-zA-Z\d]{8,}/, {
    message: 'La password debe tener al menos 8 caracteres y solo puede contener letras y números.',
  })
  password: string;
}
