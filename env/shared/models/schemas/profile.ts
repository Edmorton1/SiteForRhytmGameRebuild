import {IsISO31661Alpha2, IsISO8601, IsNotEmpty, IsOptional, IsString, Max, MaxLength} from 'class-validator';
import {IsId} from '../enums/decorators';

export class Profile {
	@IsId()
	id: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(32)
	name: string;

	@IsString()
	@IsOptional()
	avatar?: string;

	@IsString()
	@Max(512)
	about: string;

	@IsISO31661Alpha2()
	country_code: string;

	@IsISO8601()
	created_at: string;
}

// export const UserProfileZodSchemaClient = ProfileZodSchema.pick({
// 	id: true,
// 	name: true,
// 	avatar: true,
// 	country_code: true,
// });

