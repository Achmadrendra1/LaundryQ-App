import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.setGlobalPrefix('/v1');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('LaundryQ App')
    .setDescription('LaundryQ API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ?? 3600;
  await app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
    console.log(`Docs started on http://localhost:${port}/docs`);
    console.log(`Bull Board started on http://localhost:${port}/v1/queues`);
  });
}
bootstrap();
