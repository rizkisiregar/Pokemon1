import {
  Box,
  ChakraProps,
  Container,
  Heading,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import { lazy } from 'react';
import { useCollection } from 'context/CollectionContext';
import { useTheme } from 'context/ThemeContext';
import { Link } from 'react-router-dom';

const CardPokemon = lazy(() => import('components/Reuseable/CardPokemon/CardPokemon'));
const Spinball = lazy(() => import('components/Reuseable/Spinball/Spinball'));

const CollectionPage = () => {
  const theme = useTheme();
  const collection = useCollection();
  return (
    <Box id="Collection">
      <Container {...container_style}>
        <Heading
          as="h4"
          {...heading_style}
          color={`${theme}.text`}
        >
          <Box marginLeft="1rem">
            <Text>My Pokemons</Text>
          </Box>
        </Heading>
        {!!collection.length && (
          <SimpleGrid minChildWidth="8rem" spacing="40px" justifyItems="center">
            {collection.map((pokemon, idx) => (
              <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
                <CardPokemon
                  theme={theme}
                  name={`The ${pokemon.name}`}
                  number={idx + 1}
                  imageUrl={pokemon.img_url}
                  owned={0}
                  release
                  nickname={pokemon.nickname}
                  typeColor={pokemon.color}
                />
              </Link>
            ))}
          </SimpleGrid>
        )}
        {!collection.length && (
          <Box textAlign="center" marginTop="2rem">
            <Text {...no_collection_text}>
              You Dont Have any Pokemon!
            </Text>
            <Spinball height="15rem" speed="20" />
            <br />
            <Link to="/">
              <button type="button" style={{ ...back_home }}>
                Catch Wild Pokemon
              </button>
            </Link>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CollectionPage;

const container_style = {
  maxW: '960px',
  padding: '2rem 2rem 6rem',
};

const heading_style: ChakraProps = {
  color: '#2E3131',
  textAlign: 'center',
  marginTop: '1rem',
  marginBottom: '3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const no_collection_text: ChakraProps = {
  fontWeight: 'bold',
  fontSize: '28px',
  marginBottom: '3rem',
};

const back_home = {
  backgroundColor: '#23CBA7',
  marginTop: '3rem',
  color: 'white',
  height: '3.4rem',
  padding: '0 1rem',
  borderRadius: '3.5rem',
  boxShadow: '0px 0px 7px 1px #000000',
};
