/* eslint-disable react/require-default-props */
import { MouseEvent } from 'react';
import {
  Box,
  Button,
  ChakraProps,
  Image,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import pokeball from 'assets/Pokeball.png';
import pokeEgg from 'assets/PokeEgg.png';
import { useRemoveCollection } from 'context/CollectionContext';

type props = {
  theme: 'dark' | 'light';
  name: string;
  number: number;
  imageUrl: string;
  owned: number;
  release?: boolean;
  nickname?: string;
  typeColor?: string;
}

const CardPokemon = ({
  theme,
  number,
  name,
  imageUrl,
  owned,
  release = false,
  nickname = '',
  typeColor = '',
}: props) => {
  const removeCollection = useRemoveCollection();

  const handleRelease = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    onOpen();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      {...card_style}
    >
      <Modal
        blockScrollOnMount={false}
        onClose={onClose}
        size="xs"
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader {...modal_header}>
            Do You Want Release
            <br />
            {nickname}?
          </ModalHeader>
          <ModalFooter {...modal_footer}>
            <Button
              {...yes_button}
              onClick={() => {
                removeCollection(nickname);
                onClose();
              }}
            >
              Yes
            </Button>
            <Button {...no_button} onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box {...image_box} bgColor={typeColor || 'rgba(0,0,0,.3)'}>
        <Box {...number_style}>
          <b>#{String(number).padStart(3, '0')}</b>
        </Box>
        <Image
          src={imageUrl}
          fallbackSrc={pokeEgg}
          width="90%"
          alt={name}
        />
      </Box>
      {!release && (
        <Box {...owned_style} bgColor={`${theme}.bg`}>
          <b>Owned {owned}</b>
        </Box>
      )}
      {release && (
        <button
          type="button"
          style={{
            ...release_style,
          }}
          onClick={handleRelease}
        >
          <b>Release</b>
        </button>
      )}
      <Box p="20px 0px">
        <Box
          mt={nickname ? -1.5 : 1.5}
          fontWeight="semibold"
          textAlign="center"
          textTransform="capitalize"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <Box>
            {nickname}
          </Box>
          {name}
        </Box>
      </Box>
    </Box>
  );
};

export default CardPokemon;

const card_style: ChakraProps = {
  maxW: 'sm',
  width: '10rem',
  height: '15rem',
  border: '1px solid rgba(0,0,0,.125)',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '7px 7px 0 #23CBA7',
  transition: 'all 0.25s',
  position: 'relative',
  _hover: {
    boxShadow: 'none',
  },
};

const number_style: ChakraProps = {
  position: 'absolute',
  top: '0.5rem',
  right: '0.7rem',
};

const image_box: ChakraProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundSize: '70%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${pokeball})`,
  borderRadius: '20px',
  padding: '8% 0',
};

const owned_style: ChakraProps = {
  position: 'absolute',
  top: '9.5rem',
  left: '0rem',
  border: '0.2rem solid #23CBA7',
  borderLeft: 'none',
  height: '1.8rem',
  width: '5.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px',
  fontSize: '14px',
};

const release_style = {
  position: 'absolute' as const,
  backgroundColor: '#23CBA7',
  color: 'white',
  top: '9.5rem',
  left: '0rem',
  border: '0.2rem solid #23CBA7',
  borderLeft: 'none',
  height: '1.8rem',
  width: '5.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px',
  fontSize: '14px',
};

const modal_header: ChakraProps = {
  fontSize: 'medium',
  textAlign: 'center',
  marginTop: '2rem',
  textTransform: 'capitalize',
};

const modal_footer: ChakraProps = {
  display: 'initial',
  textAlign: 'center',
  padding: 0,
};

const yes_button: ChakraProps = {
  margin: '10px',
  width: '100px',
  color: 'white',
  bgColor: '#23CBA7',
};

const no_button: ChakraProps = {
  margin: '20px 10px',
  width: '100px',
  color: 'white',
  bgColor: '#e63950',
};
