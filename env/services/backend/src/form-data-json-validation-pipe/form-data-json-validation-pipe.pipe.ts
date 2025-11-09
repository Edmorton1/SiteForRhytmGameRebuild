import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';
import {plainToInstance} from 'class-transformer';
import {validateOrReject, ValidationError} from 'class-validator';

@Injectable()
export class FormDataJsonValidationPipePipe<T extends object> implements PipeTransform {
	constructor(private readonly dtoClass: new () => T) {}

	async transform(value: any, metadata: ArgumentMetadata) {
		console.log('transform', value, typeof value, metadata);
		try {
			const json = JSON.parse(value);
			console.log('json', json);
			const instance = plainToInstance(this.dtoClass, json);
			await validateOrReject(instance);
			return instance;
		} catch (err) {
			const errors: string[] = [];
			if (Array.isArray(err) && err.every((e) => e instanceof ValidationError)) {
				err.forEach((e) => e?.children?.forEach((c) => c.constraints && errors.push(...Object.values(c.constraints))));
				throw new BadRequestException(errors);
			}
			console.log('in throw', err);
			throw new BadRequestException(`The passed FormData with the property ${metadata.data} is not JSON`);
		}
	}
}
