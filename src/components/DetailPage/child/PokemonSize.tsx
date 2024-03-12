import {
  ChakraProps,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

type props = {
  height: number | undefined;
  weight: number | undefined;
}

const PokemonSize = ({ height, weight }: props) => (
  <StatGroup {...heigt_box}>
    <Stat position="initial">
      <StatLabel>Height</StatLabel>
      <StatNumber>{`${height || 0}"`}</StatNumber>
    </Stat>
    <Stat position="initial">
      <StatLabel>Weight</StatLabel>
      <StatNumber>{`${weight || 0}lbs`}</StatNumber>
    </Stat>
  </StatGroup>
);

export default PokemonSize;

const heigt_box: ChakraProps = {
  border: '1px solid rgba(0,0,0,.125)',
  borderRadius: '10px',
  padding: '20px',
  textAlign: 'center',
};
