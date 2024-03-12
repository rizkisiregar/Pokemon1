export interface MoveClass {
  name: string;
}

export interface Stat {
  stat: MoveClass;
  effort: number;
  base_stat: number;
}

export interface AbilityElement {
  ability: MoveClass;
}

export interface Type {
  type: MoveClass;
}

export interface Move {
  move: MoveClass;
}

export interface Sprites {
  back_default: string;
  front_default: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: Sprites;
  abilities: AbilityElement[];
  types: Type[];
  stats: Stat[];
  moves: Move[];
}

export interface IPokemonDetRes {
  pokemon: Pokemon;
}
