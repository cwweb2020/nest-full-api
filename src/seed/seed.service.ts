import { Injectable } from '@nestjs/common';
import { PokeDataResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=300');
    const data: PokeDataResponse = await res.json();

    const pokemonToInsert: { name: string; pokeNumber: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');

      const pokeNumber = +segments[segments.length - 2];

      //  await this.pokemonModel.create({ pokeNumber, name });
      pokemonToInsert.push({ name, pokeNumber });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return `seed executed successfully`;
  }
}
