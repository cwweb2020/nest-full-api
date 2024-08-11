import { Injectable } from '@nestjs/common';
import { PokeDataResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  async executeSeed() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
    const data: PokeDataResponse = await res.json();
    // console.log(data);

    const bothData = data.results.map(({ name, url }) => {
      // console.log(name, url);
      const segments = url.split('/');
      //   console.log(segments);
      const pokeNumber = +segments[segments.length - 2];
      //   console.log(pokeNumber, name);
      return { pokeNumber, name };
    });
    console.log(bothData);

    return bothData;
  }
}
