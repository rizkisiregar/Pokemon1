export interface Result {
  id: number;
  url: string;
  name: string;
  image: string;
}

export interface Pokemons {
  count: number;
  nextOffset: number;
  prevOffset: number;
  status: boolean;
  message: string;
  results: Result[];
}

export interface IPokemonsRes {
  pokemons: Pokemons;
}
