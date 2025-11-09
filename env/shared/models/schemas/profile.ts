import {IsISO31661Alpha2, IsISO8601, IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';
import {IsId} from '../enums/decorators';
import {ApiProperty} from '@nestjs/swagger';
import {countryCodes} from '../enums/countries';

class ProfileBase {
	@ApiProperty({example: 'John'})
	@IsString()
	@IsNotEmpty()
	@MaxLength(32)
	name: string;

	@ApiProperty({example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1'})
	@IsString()
	@IsOptional()
	avatar?: string;

	@ApiProperty({example: 'Mr. Nice Guy'})
	@IsString()
	@MaxLength(512)
	about: string;

	@ApiProperty({enum: countryCodes})
	@IsISO31661Alpha2()
	country_code: string;
}

export class ProfileDto extends ProfileBase {}

export class Profile extends ProfileBase {
	@IsId()
	id: number;

	@ApiProperty({example: '2025-11-09T08:10:48.334Z'})
	@IsISO8601()
	created_at: string;
}

// export const UserProfileZodSchemaClient = ProfileZodSchema.pick({
// 	id: true,
// 	name: true,
// 	avatar: true,
// 	country_code: true,
// });

