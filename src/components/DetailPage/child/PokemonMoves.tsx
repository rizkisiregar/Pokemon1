import { Box, ChakraProps } from '@chakra-ui/react';
import { Move } from 'types';

type props = {
  moves: Move[] | undefined;
  typeColor: string;
}

const PokemonMoves = ({ moves, typeColor }: props) => (
  <Box pb={4} {...panel_style}>
    {moves?.map((move) => (
      <Box
        key={move.move.name}
        border={`2px solid ${typeColor}`}
        {...move_style}
      >
        {move.move.name}
      </Box>
    ))}
  </Box>
);

export default PokemonMoves;

const panel_style: ChakraProps = {
  alignItems: 'center',
  flexWrap: 'wrap',
  margin: '0px',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '2px',
  maxHeight: '412px',
  overflowY: 'scroll',
  padding: '5px',
};

const move_style: ChakraProps = {
  marginRight: '0.5rem',
  marginBottom: '0.5rem',
  textTransform: 'capitalize' as const,
  padding: '0 0.5rem',
};
