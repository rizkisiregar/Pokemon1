/* eslint-disable no-unused-vars */
import {
  Button,
  ChakraProps,
  FormControl,
  FormHelperText,
  FormLabel,
  Input, Modal,
  ModalBody,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';

type props = {
  isOpen: boolean,
  pokemonName: string,
  onClose: () => void,
  onCollect: () => void,
  nickname: string;
  nicknameErr: string;
  onNicknameChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SuccessModal = ({
  isOpen,
  pokemonName,
  onClose,
  onCollect,
  nickname,
  nicknameErr,
  onNicknameChange,
}: props) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Yeey Success To Catch Pokemon!!</ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel textTransform="capitalize">Give {pokemonName} nickname</FormLabel>
            <Input
              value={nickname}
              onChange={onNicknameChange}
              ref={initialRef}
              placeholder="Input Nickname"
            />
            {nicknameErr && (
              <FormHelperText color="red !important" textAlign="left">
                {nicknameErr}
              </FormHelperText>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter {...modal_footer}>
          <Button mr={3} {...yes_button} onClick={onCollect}>
            Adopt
          </Button>
          <Button {...no_button} onClick={onClose}>
            Release
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;

const modal_footer: ChakraProps = {
  display: 'initial',
  textAlign: 'center',
  paddingTop: '0',
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
