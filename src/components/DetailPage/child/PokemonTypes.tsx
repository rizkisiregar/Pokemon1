import { Box, ChakraProps } from '@chakra-ui/react';
import { TypeColors } from 'colors';
import { Type } from 'types';

type props = {
  types: Type[] | undefined
}

const PokemonTypes = ({ types }: props) => (
  <Box {...type_box}>
    {types?.map((type) => (
      <Box
        {...bedge_type}
        bgColor={TypeColors[type.type.name]}
        color="light.text"
        key={type.type.name}
      >
        {type.type.name}
      </Box>
    ))}
  </Box>
);

export default PokemonTypes;

const type_box: ChakraProps = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  marginBottom: '10px',
};

const bedge_type: ChakraProps = {
  fontWeight: 'bold',
  width: 'fit-content',
  padding: '0 1rem',
  borderRadius: '1rem',
  margin: '5px',
  textTransform: 'capitalize',
};
