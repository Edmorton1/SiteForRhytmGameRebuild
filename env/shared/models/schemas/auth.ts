import {UserDto} from './user';
import {IsObject, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {ProfileDto} from './profile';

export class AuthDto {
	@ValidateNested()
	@Type(() => UserDto)
	user: UserDto;

	@ValidateNested()
	@Type(() => ProfileDto)
	profile: ProfileDto;
}

