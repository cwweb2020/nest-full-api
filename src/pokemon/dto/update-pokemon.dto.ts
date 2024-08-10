import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';
// import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
