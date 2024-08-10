//
//
//
import { IsInt, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name: string;

  @IsNumber({}, { message: 'El número de la pokédex debe ser un número' })
  @IsInt({ message: 'El número de la pokédex debe ser un entero' })
  @Min(1, { message: 'El número de la pokédex debe ser mayor que 0' })
  pokeNumber: number;
}
