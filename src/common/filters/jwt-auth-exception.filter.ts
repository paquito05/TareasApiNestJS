import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(UnauthorizedException) // Captura excepciones específicas de autorización
export class JwtAuthExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Personaliza la respuesta de error
    response.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Invalid or missing token',
      timestamp: new Date().toISOString(),
    });
  }
}
