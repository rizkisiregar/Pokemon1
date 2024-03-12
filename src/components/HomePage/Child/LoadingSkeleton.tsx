import { ChakraProps, SimpleGrid, Skeleton } from '@chakra-ui/react';

const LoadingSkeleton = () => {
  const skeletonArr = Array.from(Array(20).keys());

  return (
    <SimpleGrid minChildWidth="8rem" spacing="40px" justifyItems="center">
      {skeletonArr.map((skeleton) => (
        <Skeleton {...skeleton_style} key={skeleton} />
      ))}
    </SimpleGrid>
  );
};

export default LoadingSkeleton;

const skeleton_style: ChakraProps = {
  height: '14.5rem',
  width: '10rem',
  borderRadius: '20px',
};
