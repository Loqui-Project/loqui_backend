import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ZodFilter } from './common/exceptions-filter/zod-filter.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Loqui')
    .setDescription('The loqui project API description')
    .setVersion('1.0')
    .addTag('loqui')
    .addBearerAuth()
    .build();
  app.useGlobalFilters(new ZodFilter());
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
