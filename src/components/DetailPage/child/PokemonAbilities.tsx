import { Box, ChakraProps, Text } from '@chakra-ui/react';
import { AbilityElement } from 'types';

type props = {
  abilities: AbilityElement[] | undefined;
  typeColor: string;
}

const PokemonAbilities = ({ abilities, typeColor }: props) => (
  <Box display="flex">
    {abilities?.map((ability) => (
      <Box
        key={ability.ability.name}
        border={`2px solid ${typeColor}`}
        {...ability_box}
      >
        <Text transform="skew(15deg);">
          {ability.ability.name}
        </Text>
      </Box>
    ))}
  </Box>
);

export default PokemonAbilities;

const ability_box: ChakraProps = {
  marginTop: '0.75rem',
  marginRight: '1rem',
  transform: 'skew(-15deg)',
  padding: '0.1rem 1rem',
  textTransform: 'capitalize',
};
