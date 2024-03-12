import {
  Box,
  keyframes,
  usePrefersReducedMotion,
  Image,
} from '@chakra-ui/react';
import CatchBall from 'assets/CatchBall.png';

const shake = keyframes`
  0% { transform:translate(0,0) }
  1.78571% { transform:translate(5px,0) }
  3.57143% { transform:translate(0,0) }
  5.35714% { transform:translate(5px,0) }
  7.14286% { transform:translate(0,0) }
  8.92857% { transform:translate(5px,0) }
  10.71429% { transform:translate(0,0) }
  100% { transform:translate(0,0) }
`;

type props = {
  withAnimation: boolean,
};

const CatchingBall = ({ withAnimation }: props) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${shake} 3.72s ease infinite`;

  return (
    <Box
      animation={withAnimation ? animation : undefined}
      transformOrigin="50% 50%"
    >
      <Image
        alt="Poke Ball"
        src={CatchBall}
        height="12rem"
        width="12rem"
      />
    </Box>
  );
};

export default CatchingBall;
