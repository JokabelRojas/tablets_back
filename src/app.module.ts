import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { StudentsModule } from './students/students.module'
import { TabletsModule } from './tablets/tablets.module'
import { ClassroomModule } from './classroom/classroom.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(
      'mongodb+srv://Jokita:Joka123.@cluster0.sdxd75r.mongodb.net/tablet-database?retryWrites=true&w=majority',
    ),
    // <-- Asegúrate de tener esto
    UsersModule,
    StudentsModule,
    TabletsModule,
    ClassroomModule,
    AuthModule,
  ],
})
export class AppModule {}
