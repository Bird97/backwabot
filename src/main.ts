import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { initializeMappers } from "Application/Mappers";

initializeMappers();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo de api para configuracion con nginx
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("Wabot API")
    .setDescription("Documentación de la API de Wabot")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "access-token"
    )
    .build();
  app.enableCors({
    origin: "*",
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(process.env.PORT ?? 3050);
}
bootstrap();
