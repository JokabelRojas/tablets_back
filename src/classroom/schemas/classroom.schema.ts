import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type ClassroomDocument = Classroom & Document

@Schema({ timestamps: true })
export class Classroom {
  @Prop({ required: true })
  grade: number

  @Prop({ required: true })
  section: string

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }], default: [] })
  students: Types.ObjectId[]
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom)
