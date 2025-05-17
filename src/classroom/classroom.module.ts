import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Classroom, ClassroomSchema } from './schemas/classroom.schema'
import { ClassroomService } from './classroom.service'
import { ClassroomController } from './classroom.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Classroom.name, schema: ClassroomSchema },
    ]),
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService],
})
export class ClassroomModule {}
