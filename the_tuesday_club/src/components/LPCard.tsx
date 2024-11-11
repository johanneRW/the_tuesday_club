import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, HStack, Stack , Text} from "@chakra-ui/react";
import { Album } from "../hooks/useAlbums";
import LPPlaceholder from "./LPPlaceholder";

interface Props {
  album: Album;
}

const LPCard = ({ album }: Props) => {
  console.log('lp-card' + album)
    return (
      <Card maxW='250px' h='460px'> 
        <CardBody>
          <LPPlaceholder />
          <Stack mt='3' spacing='1'>
          <Heading fontSize="xl">{album.album_name}</Heading>
            <Text color='blue.600' fontSize='l'>{album.artist_name}</Text>
            <Text>{album.units} {album.format}</Text>
            <Text fontSize='sm'>{album.label_name}</Text>
            <Text color='blue.600' fontSize='m'> 
              XX kr
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue' size='sm'>
              Add to cart
            </Button>
            <Button variant='ghost' colorScheme='blue' size='sm'>
              Add to wishlist
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  };

export default LPCard;
