import 'reflect-metadata';

import {IsInt, IsPositive, MinLength, registerDecorator, validateOrReject} from 'class-validator';
import {plainToInstance, Type} from 'class-transformer';

// ДОКА - https://github.com/typestack/class-validator https://github.com/typestack/class-transformer

// function IsId() {
// 	return function (object: object, propertyName: string) {
// 		registerDecorator({
// 			name: 'IsId',
// 			target: object.constructor,
// 			propertyName: propertyName,
// 			validator: {
// 				validate(value: any) {
// 					const num = Number(value);
// 					return !isNaN(num) && num > 0;
// 				}
// 			},
// 			options: {
// 				message: 'Is not ID'
// 			}
// 		});
// 	};
// }

function IsId() {
	return function (target: object, propertyName: string) {
		IsInt()(target, propertyName);
		IsPositive()(target, propertyName);
	};
}

class Taro {
	@Type(() => Number)
	@IsId()
	id: number;

	@MinLength(4)
	name: string;
}

// const taro = new Taro();
// taro.name = '12';
// taro.id = 123;

// const taro: Taro = {
// 	id: 13,
// 	name: '123'
// };

const taro = plainToInstance(Taro, {
	id: 'апап',
	name: '123'
});
console.log(taro);

validateOrReject(taro).catch((err) => console.log(err));

// Завтра перенести shared и сервисы в какую-то отдельную папку чтобы были тоже как монорепа или провреить что всё норм работает в докере