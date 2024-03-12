import {
  Box,
  Image,
  Flex,
  ChakraProps,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Pokeball from 'assets/Pokeball.png';
import Moon from 'assets/Moon.png';
import Sun from 'assets/Sun.png';
import UpArrow from 'assets/UpArrow.png';
import { useSwitchTheme } from 'context/ThemeContext';

type props = {
  theme: 'dark' | 'light',
  count: number
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const CollectionButton = ({ theme, count }: props) => {
  const switchTheme = useSwitchTheme();
  return (
    <Flex {...footer_flex} justify="space-between" wrap="wrap">
      <Box margin="auto">
        <Flex align="center">
          <button type="button" style={{ ...rounded_button }} onClick={switchTheme}>
            {theme === 'dark' && (
              <Image alt="Light" src={Sun} height="25px" width="25px" />
            )}
            {theme === 'light' && (
              <Image alt="Dark" src={Moon} height="20px" width="20px" />
            )}
          </button>
          <Link to="/collection">
            <button type="button" style={{ ...pokemon_button }}>
              <Image alt="Poke Ball" src={Pokeball} height="30px" width="30px" />
              <b style={{ margin: '0 0.7rem' }}>My Pokemon</b>
              <Box {...count_box}>
                <b>{count}</b>
              </Box>
            </button>
          </Link>
          <button type="button" style={{ ...rounded_button }} onClick={scrollTop}>
            <Image alt="Dark" src={UpArrow} height="20px" width="20px" />
          </button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CollectionButton;

const footer_flex: ChakraProps = {
  zIndex: '99',
  overflow: 'hidden',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  left: '0',
  padding: '1rem 0',
};

const pokemon_button = {
  backgroundColor: '#23CBA7',
  color: 'white',
  height: '3.4rem',
  width: '13rem',
  borderRadius: '3.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 1rem',
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

const rounded_button = {
  backgroundColor: '#23CBA7',
  height: '3.4rem',
  width: '3.4rem',
  borderRadius: '3.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 0px 7px 1px #000000',
};
