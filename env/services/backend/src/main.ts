import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SERVER_PREFIX} from '../shared/common/CONST';
import {ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

console.log('ROOT: ', process.env.ASD_ROOT, 'SERVICE: ', process.env.ASD_SERVICE);

(async () => {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	);

	app.setGlobalPrefix(SERVER_PREFIX);

	const config = new DocumentBuilder()
		.setTitle('title')
		.setDescription('description')
		.setVersion('1.0')
		.addCookieAuth('cuper.sid')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(SERVER_PREFIX + '/spec', app, document);

	await app.listen(process.env.PORT ?? 3000);
})();
