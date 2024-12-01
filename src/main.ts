import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { ResponseStructureFilter } from './common/filters/response-structure.filter';
import { JwtAuthExceptionFilter } from './common/filters/jwt-auth-exception.filter';
import { ResponseStructureInterceptor } from './common/interceptor/response-structure.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1/');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Filtro para excepciones relacionadas con JWT
  app.useGlobalFilters(new JwtAuthExceptionFilter());

  // Filtro global para estructurar todas las respuestas
  // app.useGlobalFilters(new ResponseStructureFilter());

  // Aplica el interceptor global para estructurar respuestas exitosas
  app.useGlobalInterceptors(new ResponseStructureInterceptor());

  await app.listen(envs.port ?? 3000);
  console.log(`Aplicación corriendo en el puerto ${envs.port}`);
}
bootstrap();
