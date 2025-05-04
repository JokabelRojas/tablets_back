import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TabletsService } from './tablets.service';
import { TabletsController } from './tablets.controller';
import { Tablet, TabletSchema } from './schemas/tablet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tablet.name, schema: TabletSchema }])
  ],
  controllers: [TabletsController],
  providers: [TabletsService],
  exports: [TabletsService],
})
export class TabletsModule {}
