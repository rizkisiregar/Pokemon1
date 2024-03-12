import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from 'queries';
import { IPokemonsRes } from 'types';
import { Link } from 'react-router-dom';
import {
  Box,
  ChakraProps,
  Container,
  Heading,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import { useTheme } from 'context/ThemeContext';
import PokeHunt from 'assets/PokeHunt.png';
import DownArrow from 'assets/DownArrow.png';
import { lazy } from 'react';
import { usePokemonCount, usePokemonCountByName } from 'context/CollectionContext';

const Spinball = lazy(() => import('components/Reuseable/Spinball/Spinball'));
const CardPokemon = lazy(() => import('components/Reuseable/CardPokemon/CardPokemon'));
const CollectionButton = lazy(() => import('./Child/CollectionButton'));
const LoadingSkeleton = lazy(() => import('./Child/LoadingSkeleton'));

const HomePage = () => {
  const theme = useTheme();
  const variables = {
    limit: 20,
    offset: 1,
  };
  const {
    loading,
    error,
    data,
    fetchMore,
  } = useQuery<IPokemonsRes>(GET_POKEMONS, { variables });
  const pokemons = data?.pokemons?.results;

  const pokemonCount = usePokemonCount();
  const pokemonsCountByName = usePokemonCountByName();

  const handleLoadMore = () => {
    variables.offset = data?.pokemons.nextOffset as number;
    fetchMore({
      variables,
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (fetchMoreResult) {
          fetchMoreResult.pokemons.results = [
            ...previousResult.pokemons.results,
            ...fetchMoreResult.pokemons.results,
          ];
          return fetchMoreResult;
        }
        return previousResult;
      },
    });
  };

  return (
    <Box id="Home">
      <Container {...container_style}>
        <Heading
          as="h4"
          {...heading_style}
          color={`${theme}.text`}
        >
          <Spinball height="3rem" speed="10" />
          <Box marginLeft="1rem">
            <Image
              alt="Pokehunt"
              height="3.5rem"
              src={PokeHunt}
            />
          </Box>
        </Heading>
        {loading && (
          <LoadingSkeleton />
        )}
        {!loading && error && (
          <span>Error! {error.message}</span>
        )}
        {!loading && pokemons && (
          <>
            <SimpleGrid minChildWidth="8rem" spacing="40px" justifyItems="center">
              {pokemons.map((pokemon, idx) => (
                <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
                  <CardPokemon
                    theme={theme}
                    name={pokemon.name}
                    number={idx + 1}
                    imageUrl={pokemon.image}
                    owned={pokemonsCountByName(pokemon?.name as string)}
                  />
                </Link>
              ))}
            </SimpleGrid>
            <Box {...loadmore_box}>
              <button
                type="button"
                style={{ ...loadmore_style }}
                onClick={handleLoadMore}
              >
                <Image alt="loadmore" src={DownArrow} height="20px" width="20px" />
              </button>
            </Box>
          </>
        )}
        <CollectionButton theme={theme} count={pokemonCount()} />
      </Container>
    </Box>
  );
};

export default HomePage;

const container_style = {
  maxW: '960px',
  padding: '2rem 2rem 6rem',
};

const heading_style: ChakraProps = {
  color: '#2E3131',
  textAlign: 'center',
  marginTop: '1rem',
  marginBottom: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const loadmore_box: ChakraProps = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1.5rem',
};

const loadmore_style = {
  backgroundColor: '#23CBA7',
  height: '3.4rem',
  width: '3.4rem',
  borderRadius: '3.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
