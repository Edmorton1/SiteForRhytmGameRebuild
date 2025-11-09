import 'reflect-metadata'

import {IsId, TransformDefault} from '../enums/decorators';
import {IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';

const roles = ['user', 'admin'] as const;

// TODO: Расхождение типов
class UserBase {
	@IsEmail()
	@MaxLength(256)
	email?: string;

	@IsString()
	@MaxLength(128)
  @MinLength(3)
	password?: string;
}
export class UserDTO extends UserBase {}

export class User extends UserBase{
	@IsId()
	id: number;

	@IsEnum(roles)
	role: (typeof roles)[number];

	@IsString()
	@MaxLength(21)
	@IsOptional()
	provider_id?: string;

  @TransformDefault(false)
	@IsBoolean()
	banned: boolean;
}

// const instance = plainToInstance(User, {
// 	email: 23,
// 	password: 123123
// })
//
// const asd = validateSync(instance)
//
// console.log('asd', asd, instance)
