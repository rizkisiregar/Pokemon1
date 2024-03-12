import {
  Box, ChakraProps, Container, Skeleton, SkeletonText, Stack,
} from '@chakra-ui/react';
import React from 'react';

const LoadingSkeleton = () => (
  <Stack>
    <Skeleton height="12rem" />
    <Box>
      <Container {...container_style} mt="1rem">
        <Box display={{ md: 'flex' }}>
          <Box flexShrink={0} width={{ md: '30%' }}>
            <SkeletonText mt="4" noOfLines={5} spacing="4" />
          </Box>
          <Box
            pl={{ md: 10 }}
            width={{ md: '70%' }}
          >
            <SkeletonText mt="4" noOfLines={15} spacing="4" />
          </Box>
        </Box>
      </Container>
    </Box>
  </Stack>
);

export default LoadingSkeleton;

const container_style: ChakraProps = {
  maxW: '960px',
  padding: '0rem 1rem 3rem 1rem',
};
