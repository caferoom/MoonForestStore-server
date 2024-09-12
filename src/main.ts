import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";

import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import { AllExceptionsFilter } from "./common/exceptions/base.exception.filter";
import { HttpExceptionFilter } from "./common/exceptions/http.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 跨域处理
  app.enableCors({
    origin: "http://localhost:9528",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // 允许携带凭证
  });

  // 接口版本化管理
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常捕获
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // 启用全局验证和转换管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 自动转换类型
      whitelist: true, // 自动移除不在 DTO 中定义的属性
    }),
  );

  await app.listen(3000);
}
bootstrap();
