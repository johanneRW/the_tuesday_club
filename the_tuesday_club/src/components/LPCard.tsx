import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text, Box } from "@chakra-ui/react";
import { Album } from "../hooks/useAlbums";
import ImagePlaceholder from "./ImagePlaceholder";

interface Props {
  album: Album;
}

function capitalizeWords(text: string) {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const LPCard = ({ album }: Props) => {
  console.log('lp-card' + album)
    return (
      <Card maxW='100%' h='460px'> 
        <CardBody>
          <Box display="flex" justifyContent="center">
            <ImagePlaceholder format={album.format_name} />
          </Box>
          <Stack mt='3' spacing='1'>
            <Heading fontSize="xl">{capitalizeWords(album.album_name)}</Heading>
            <Text fontSize="l">{capitalizeWords(album.artist_name)}</Text>
            <Text>{album.album_units} • {album.format_name}</Text>
            <Text color='blue.600' fontSize='sm'>{album.label_name}</Text>
            <Text color='blue.600' fontSize='m'> {album.album_price} kr</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <Button variant='solid' colorScheme='blue' size='sm'>
              Add to pile
            </Button>
        </CardFooter>
      </Card>
    );
};

export default LPCard;
