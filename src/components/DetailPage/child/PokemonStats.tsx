import {
  Box, ChakraProps, Grid, Progress, Text,
} from '@chakra-ui/react';
import { Stat } from 'types';

type props = {
  stats: Stat[] | undefined;
}

const PokemonStats = ({ stats }: props) => (
  <Box margin="5px">
    {stats?.map((stat) => (
      <Box key={stat.stat.name}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Box w="100%">
            <Text {...stat_name}>{stat.stat.name}</Text>
          </Box>
          <Box w="100%">
            <Text {...stat_value}>{stat.base_stat}</Text>
          </Box>
        </Grid>
        <Progress {...progrs_style} colorScheme="gray" size="xs" value={stat.base_stat} />
      </Box>
    ))}
  </Box>
);

export default PokemonStats;

const progrs_style: ChakraProps = {
  marginTop: '5px',
  position: 'inherit',
};

const stat_value: ChakraProps = {
  textTransform: 'uppercase',
  textAlign: 'right',
};

const stat_name: ChakraProps = {
  textTransform: 'uppercase',
};
