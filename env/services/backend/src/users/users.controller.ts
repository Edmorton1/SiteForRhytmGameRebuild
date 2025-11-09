import {Controller, Get, Post, Body, Param, Delete, Req, UseInterceptors, UploadedFile} from '@nestjs/common';
import {UsersService} from './users.service';
import {serverPaths} from '../../shared/common/PATHS';
import {User} from '../../shared/models/schemas/user';
import {ApiOkResponse} from '@nestjs/swagger';
import {AuthDto} from '../../shared/models/schemas/auth';
import {FileInterceptor} from '@nestjs/platform-express';
import {FormDataJsonValidationPipePipe} from '../form-data-json-validation-pipe/form-data-json-validation-pipe.pipe';
import {Profile} from '../../shared/models/schemas/profile';

@Controller()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOkResponse({type: User})
	@Post(serverPaths.registration)
	@UseInterceptors(FileInterceptor('avatar'))
	create(
		@UploadedFile() file: Express.Multer.File,
		@Body('data', new FormDataJsonValidationPipePipe(AuthDto)) body: AuthDto
	) {
		console.log(file, body);
		return 'this.usersService.create(createUserDto)1;';
	}

	@Post(serverPaths.login)
	findAll(@Body() body: Profile) {
		console.log(body);
		return this.usersService.findAll();
	}

	@Get(serverPaths.init)
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id);
	}

	@Delete(serverPaths.logout)
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id);
	}
}
