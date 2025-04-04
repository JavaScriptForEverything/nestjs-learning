import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	// app.useGlobalPipes(new ValidationPipe())

	const config = new DocumentBuilder()
		.setTitle('NestJs Documentation ')
		.setDescription('api url http://localhost:3000')
		.setTermsOfService('http://localhost:3000/term-of-service')
		.setLicense('MIT Licence', 'https://gist.github.com/katahiromz/5e6b1a465dc0526db134a32bc01a5aa4')
		.setVersion('1.0')
		.addServer('http://localhost:3000')
		.build()
	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
