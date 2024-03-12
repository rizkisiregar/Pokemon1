import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      nextOffset
      prevOffset
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      height
      weight
      base_experience
      sprites {
        back_default
        front_default
      }
      abilities {
        ability {
          name
        }
      }
      types {
        type {
          name
        }
      }
      stats{
        stat{
          name
        }
        effort
        base_stat
      }
      moves {
        move {
          name
        }
      }
    }
  }
`;
