import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  @Prop({ required: true, index: true, unique: true }) // El nombre es requerido
  name: string;

  @Prop({ required: true, index: true, unique: true })
  pokeNumber: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
