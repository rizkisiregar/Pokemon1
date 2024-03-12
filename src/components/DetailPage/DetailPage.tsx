import { useQuery } from '@apollo/client';
import {
  Box,
  ChakraProps,
  Container,
  Image,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { TypeColors } from 'colors';
import { GET_POKEMON_DETAIL } from 'queries';
import { useParams } from 'react-router-dom';
import { ICollection, IPokemonDetRes } from 'types';
import Pokeball from 'assets/Pokeball.png';
import PokeEgg from 'assets/PokeEgg.png';
import { ChangeEvent, useState } from 'react';
import { useAddCollection, useIsUniqueNickname, usePokemonCountByName } from 'context/CollectionContext';
import LoadingSkeleton from './child/LoadingSkeleton';
import PokemonSize from './child/PokemonSize';
import PokemonStats from './child/PokemonStats';
import PokemonMoves from './child/PokemonMoves';
import PokemonAbilities from './child/PokemonAbilities';
import PokemonTypes from './child/PokemonTypes';
import CatchButton from './child/CatchButton';
import CatchingBall from './child/CatchingBall';
import SuccessModal from './child/SuccessModal';

const randomCatch = () => {
  const arr = [1, 0];
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];
  return item;
};

const ANIMATED_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/';

const DetailPage = () => {
  const params = useParams();
  const toast = useToast();
  const {
    loading,
    error,
    data,
  } = useQuery<IPokemonDetRes>(GET_POKEMON_DETAIL, {
    variables: {
      name: params.name,
    },
  });
  const pokemon = data?.pokemon;
  const typeColor = TypeColors[pokemon?.types[0].type.name || 'normal'];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isUniqueNickname = useIsUniqueNickname();
  const addCollection = useAddCollection();
  const pokemonCountByName = usePokemonCountByName();

  const [isCathcing, setIsCathcing] = useState(false);
  const [cathingAnim, setCathingAnim] = useState(true);
  const [nicknameErr, setNicknameErr] = useState('');
  const [nickname, setNickname] = useState('');
  const handleNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNicknameErr('');
    setNickname(event.target.value);
  };

  const handleCatch = () => {
    setIsCathcing(true);
    setTimeout(() => {
      if (randomCatch()) {
        handleSuccess();
      } else {
        handleFailure();
      }
    }, 2000);
  };

  const handleSuccess = () => {
    setCathingAnim(false);
    onOpen();
  };

  const handleFailure = () => {
    setToDefault();
    toast({
      position: 'top',
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box {...toast_style} bgColor="#e63950">
          {pokemon?.name} run away!! Try again
        </Box>
      ),
    });
  };

  const setToDefault = () => {
    setIsCathcing(false);
    setCathingAnim(true);
    setNicknameErr('');
    setNickname('');
  };

  const releasePokemon = () => {
    setToDefault();
    onClose();
  };

  const adoptPokemon = () => {
    if (nickname === '') {
      setNicknameErr('Nickname must be filled');
      return;
    }

    if (!isUniqueNickname(nickname)) {
      setNicknameErr('Nickname must be Unique');
      return;
    }

    const newPokemon: ICollection = {
      id: pokemon?.id as number,
      name: pokemon?.name as string,
      nickname,
      base_experience: pokemon?.base_experience as number,
      img_url: pokemon?.sprites.front_default as string,
      color: typeColor,
    };

    toast({
      position: 'top',
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box {...toast_style} bg="#23CBA7">
          {nickname} The {pokemon?.name} Collected
        </Box>
      ),
    });

    addCollection(newPokemon);
    setToDefault();
    onClose();
  };

  return (
    <Box id="Detail">
      {loading && (
        <LoadingSkeleton />
      )}
      {!loading && error && (
        <span>Error! {error.message}</span>
      )}
      {!loading && data && (
        <Box>
          <SuccessModal
            isOpen={isOpen}
            onClose={releasePokemon}
            pokemonName={pokemon?.name || ''}
            onCollect={adoptPokemon}
            nickname={nickname}
            nicknameErr={nicknameErr}
            onNicknameChange={handleNickname}
          />
          <Box
            {...banner_style}
            bgColor={typeColor}
          />
          <Container {...container_style}>
            <Box display={{ md: 'flex' }}>
              <Box flexShrink={0} {...left_box} width={{ md: '30%' }}>
                {isCathcing && (
                  <Box {...pokeball_style}>
                    <CatchingBall withAnimation={cathingAnim} />
                  </Box>
                )}
                {!isCathcing && (
                  <Box {...image_box}>
                    <Image
                      src={`${ANIMATED_URL}${pokemon?.id}.gif`}
                      fallbackSrc={PokeEgg}
                      width="14rem"
                      alt={pokemon?.name}
                    />
                  </Box>
                )}
                <Box
                  {...exp_box}
                  border={`2px solid ${typeColor}`}
                >
                  <Text transform="skew(15deg);">
                    BASE EXP {pokemon?.base_experience}
                  </Text>
                </Box>
                <Text {...name_style}>
                  {pokemon?.name}
                </Text>
                <PokemonTypes types={pokemon?.types} />
                <PokemonSize height={pokemon?.height} weight={pokemon?.weight} />
              </Box>
              <Box
                pt={1}
                pl={{ md: 10 }}
                width={{ md: '70%' }}
              >
                <Box>
                  <Text {...sub_title}>Ability:</Text>
                  <PokemonAbilities abilities={pokemon?.abilities} typeColor={typeColor} />
                </Box>
                <Box>
                  <Text {...sub_title}>Stats:</Text>
                  <PokemonStats stats={pokemon?.stats} />
                </Box>
                <Box>
                  <Text {...sub_title}>Moves:</Text>
                  <PokemonMoves moves={pokemon?.moves} typeColor={typeColor} />
                </Box>
              </Box>
            </Box>
            <CatchButton
              bgColor={typeColor}
              pokemonName={pokemon?.name as string}
              pokemonCount={pokemonCountByName(pokemon?.name as string)}
              handleCatch={handleCatch}
              activeCatch={isCathcing}
            />
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default DetailPage;

const toast_style: ChakraProps = {
  color: 'white',
  fontWeight: 'bold',
  borderLeft: '0.5rem solid white',
  borderRadius: '10px',
  textTransform: 'capitalize',
  p: '3',
};

const banner_style: ChakraProps = {
  width: '100%',
  height: '12rem',
  bgSize: '160px',
  bgPosition: 'center center',
  bgRepeat: 'no-repeat',
  bgImage: `url(${Pokeball})`,
};

const container_style: ChakraProps = {
  maxW: '960px',
  padding: '0rem 1rem 6rem 1rem',
};

const left_box : ChakraProps = {
  position: 'relative',
};

const image_box: ChakraProps = {
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  top: {
    base: '-13rem',
    md: '-10rem',
  },
  left: 0,
  right: 0,
};

const pokeball_style: ChakraProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '17rem',
  position: 'absolute',
  top: {
    base: '-13rem',
    md: '-10rem',
  },
  left: 0,
  right: 0,
};

const exp_box: ChakraProps = {
  marginTop: {
    base: '2rem',
    md: '4.5rem',
  },
  textAlign: 'center',
  marginBottom: '0.5rem',
  padding: '0.1rem 1rem',
  transform: 'skew(-15deg)',
  fontWeight: '900',
};

const name_style: ChakraProps = {
  textAlign: 'center',
  textTransform: 'capitalize',
  fontWeight: 'bold',
  marginTop: '-0.4rem',
  fontSize: '32px',
};

const sub_title: ChakraProps = {
  marginTop: '1rem',
  fontSize: '26px',
  fontWeight: '900',
};
