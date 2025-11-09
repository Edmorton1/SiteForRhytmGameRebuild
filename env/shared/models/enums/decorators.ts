import {IsPositive, IsInt, IsArray, IsIn, ArrayNotEmpty, IsNumber, ArrayUnique} from 'class-validator';
import {Transform} from "class-transformer";
import {ApiProperty} from '@nestjs/swagger';

export const IsId = () => {
	return (target: object, propertyName: string) => {
    // Type(() => Number)(target, propertyName)
		ApiProperty({example: 1})(target, propertyName)
		IsNumber()(target, propertyName)
		IsInt()(target, propertyName);
		IsPositive()(target, propertyName);
	};
}

export const IsEnumArray = (array: readonly string[]) => {
	return (target: object, propertyName: string) => {
		IsArray()(target, propertyName);
		ArrayNotEmpty()(target, propertyName);
		ArrayUnique()(target, propertyName);
		IsIn(array, {each: true})(target, propertyName)
	}
}

export const TransformDefault = (defaultValue: any) => {
  return (target: object, propertyName: string) => {
		ApiProperty({example: defaultValue})
		Transform(({value}) => value === undefined ? defaultValue : value)(target, propertyName)
	}
}
