import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })

export class Student {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  grade: number;

  @Prop({ required: true })
  section: string;

  @Prop({ type: Types.ObjectId, ref: 'Tablet', required: false, default: null })
  tablet: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Classroom', required: false })
  classroom: Types.ObjectId;

  @Prop({ default: true })
  active: boolean;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
