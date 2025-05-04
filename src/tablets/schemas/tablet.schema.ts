import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TabletDocument = Tablet & Document;

@Schema({ timestamps: true })
export class Tablet {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ enum: ['free', 'in_use', 'inactive'], default: 'free' })
  status: 'free' | 'in_use' | 'inactive';

  @Prop({ type: Types.ObjectId, ref: 'Student', default: null })
  assignedTo: Types.ObjectId;
}

export const TabletSchema = SchemaFactory.createForClass(Tablet);

