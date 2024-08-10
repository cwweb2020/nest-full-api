import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
// import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    // Validar que el nombre y/o numero no exista
    try {
      const newPokemon = await this.pokemonModel.create(createPokemonDto);
      return newPokemon;
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(id: string): Promise<Pokemon> {
    // Buscar por `pokeNumber` si `id` es un número
    if (!isNaN(+id)) {
      const pokemon = await this.pokemonModel.findOne({ pokeNumber: +id });
      if (pokemon) return pokemon;
    }

    // Buscar por Mongo ObjectId si es válido
    if (isValidObjectId(id)) {
      const pokemon = await this.pokemonModel.findById(id);
      if (pokemon) return pokemon;
    }

    // Buscar por nombre
    const pokemon = await this.pokemonModel.findOne({ name: id.toLowerCase() });
    if (pokemon) return pokemon;

    // Lanzar excepción si no se encontró el Pokémon
    throw new NotFoundException(
      `Pokemon con id o nombre o pokeNumber ${id} no encontrado`,
    );
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto);
    } catch (error) {
      this.handleError(error);
    }

    return { ...pokemon.toObject(), ...updatePokemonDto };
  }

  async remove(id: string) {
    // eliminar un pokemon
    // const poke = await this.findOne(id);
    // await poke.deleteOne();

    // return ` removed pokemon  ${id} `;

    const { deletedCount } = await this.pokemonModel.deleteOne({ id });

    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon con id ${id} no encontrado`);
    }

    return `Pokemon con id ${id} eliminado`;
  }

  // metodo para manejar los errores
  private handleError(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `El pokemon ya existe, el ${Object.keys(error.keyPattern)[0]}, esta duplicado`,
      );
    }

    throw new InternalServerErrorException(`no se pudo crear el pokemon`);
  }
}
