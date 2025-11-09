import {IsId, TransformDefault} from '../enums/decorators';
import {IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

const roles = ['user', 'admin'] as const;

// TODO: Расхождение типов
class UserBase {
  @ApiProperty({example: 'test@example.com'})
	@IsEmail()
	@MaxLength(256)
	email: string;

  @ApiProperty({example: '123123'})
	@IsString()
	@MaxLength(128)
  @MinLength(3)
	password: string;
}
export class UserDto extends UserBase {}

export class User extends UserBase {
	@IsId()
	id: number;

	@ApiProperty({enum: roles})
	@IsEnum(roles)
	role: (typeof roles)[number];

	@ApiProperty({example: '123123123123123123'})
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
