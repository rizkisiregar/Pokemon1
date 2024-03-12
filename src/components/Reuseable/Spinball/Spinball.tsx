import {
  keyframes,
  usePrefersReducedMotion,
  Image,
} from '@chakra-ui/react';
import pokeball from 'assets/PokeballGreen.png';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

type props = {
  height: string,
  speed: string,
}

const Spinball = ({ height, speed }: props) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite ${speed}s linear`;

  return (
    <Image
      animation={animation}
      src={pokeball}
      height={height}
      width={height}
      display="initial"
    />
  );
};

export default Spinball;
