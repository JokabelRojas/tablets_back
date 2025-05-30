import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
// import { RolesGuard } from './auth/guards/auth.guard'
// import { Reflector } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
  // app.useGlobalGuards(new RolesGuard(app.get(Reflector)))
  console.log(`Server running on port  ${await app.getUrl()} `)
}
bootstrap()
