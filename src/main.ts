import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("Fake Backend")
    .setVersion("1.0")
    .addTag("Uremont")
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup("swagger", app, document);

  await app.listen(3001);
}

bootstrap();
