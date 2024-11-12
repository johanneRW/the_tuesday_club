import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, HStack, Stack , Text} from "@chakra-ui/react";
import { Album } from "../hooks/useAlbums";
import ImagePlaceholder from "./ImagePlaceholder";


interface Props {
  album: Album;
}

const LPCard = ({ album }: Props) => {
  console.log('lp-card' + album)
    return (
      <Card maxW='250px' h='460px'> 
        <CardBody>
        <ImagePlaceholder format={album.format} />
          <Stack mt='3' spacing='1'>
          <Heading fontSize="xl">{album.album_name}</Heading>
            <Text  fontSize='l'>{album.artist_name}</Text>
            <Text>{album.units}•{album.format}</Text>
            <Text color='blue.600' fontSize='sm'>{album.label_name}</Text>
            <Text color='blue.600' fontSize='m'> {album.album_price} kr</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue' size='sm'>
              Add to cart
            </Button>
            <Button variant='ghost' colorScheme='blue' size='sm'>
            ♥ 
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  };

export default LPCard;
