import {
  Box,
  ChakraProps,
  Flex,
  Image,
} from '@chakra-ui/react';
import Pokeball from 'assets/Pokeball.png';
import LeftArrow from 'assets/LeftArrow.png';
import { Link, useNavigate } from 'react-router-dom';

type props = {
  bgColor: string,
  pokemonName: string,
  pokemonCount: number,
  activeCatch: boolean,
  handleCatch: () => void,
}

const CatchButton = ({
  bgColor,
  pokemonName,
  pokemonCount,
  activeCatch,
  handleCatch,
}: props) => {
  const navigate = useNavigate();
  return (
    <Flex {...footer_flex} justify="space-between" wrap="wrap">
      <Box margin="auto">
        <Flex align="center">
          <button
            type="button"
            style={{ ...rounded_button, backgroundColor: bgColor }}
            onClick={() => navigate(-1)}
          >
            <Image alt="back" src={LeftArrow} height="20px" width="20px" />
          </button>
          <Link to="/collection">
            <button type="button" style={{ ...pokemon_button, backgroundColor: bgColor }}>
              <Image alt="Poke Ball" src={Pokeball} height="30px" width="30px" />
              <b style={{ margin: '0 0.7rem', textTransform: 'capitalize' }}>My {pokemonName}</b>
              <Box {...count_box}>
                <b>{pokemonCount}</b>
              </Box>
            </button>
          </Link>
          <button
            type="button"
            disabled={activeCatch}
            style={{ ...rounded_button, backgroundColor: bgColor }}
            onClick={(event) => {
              event.preventDefault();
              handleCatch();
            }}
          >
            {!activeCatch && (
              <Image alt="Poke Ball" src={Pokeball} height="40px" width="40px" />
            )}
          </button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CatchButton;

const footer_flex: ChakraProps = {
  zIndex: '99',
  overflow: 'hidden',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  left: '0',
  padding: '1rem 0',
};

const rounded_button = {
  height: '3.4rem',
  width: '3.4rem',
  borderRadius: '3.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 0px 7px 1px #000000',
};

const count_box: ChakraProps = {
  lineHeight: '1.6rem',
  width: '30px',
  height: '30px',
  bgColor: '#2E3131',
  color: 'white',
  borderRadius: 'full',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const pokemon_button = {
  color: 'white',
  height: '3.4rem',
  padding: '0 0.7rem',
  borderRadius: '3.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 1rem',
  boxShadow: '0px 0px 7px 1px #000000',
};
