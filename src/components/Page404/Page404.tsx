import {
  Box, ChakraProps, Image, Text,
} from '@chakra-ui/react';
import error404 from 'assets/error404.png';

const Page404 = () => (
  <Box id="Page404">
    <Box textAlign="center" paddingTop="3.5rem">
      <Text {...no_pokemon_text}> Page Not found!
        <Image alr="Page Not Foun" {...no_pokemon_img} src={error404} />
      </Text>
    </Box>
  </Box>
);

export default Page404;

const no_pokemon_text: ChakraProps = {
  fontSize: '40px',
  color: 'lightgray',
  lineHeight: '50px',
  fontWeight: 'Bold',
};

const no_pokemon_img: ChakraProps = {
  maxW: '240px',
  padding: '50px',
  display: 'block',
  margin: 'auto',
};
