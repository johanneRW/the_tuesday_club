import { Card, CardBody, CardFooter, Divider, Heading, Stack, Text, Box, Button } from "@chakra-ui/react";
import ImagePlaceholder from "./ImagePlaceholder";
import { useCart } from "./CartContext"; 
import { Album } from "../hooks/useAlbums";
import { capitalizeWords } from "../services/capitalizeWords";
import { useAuth } from "./AuthContext";

interface Props {
  album: Album;
}

const LPCard = ({ album }: Props) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  return (
    <Card maxW="100%" h="460px">
      <CardBody>
        <Box display="flex" justifyContent="center">
          <ImagePlaceholder format={album.format_name} />
        </Box>
        <Stack mt="3" spacing="1">
          <Heading fontSize="xl">{capitalizeWords(album.album_name)}</Heading>
          <Text fontSize="l">{capitalizeWords(album.artist_name)}</Text>
          <Text>
            {album.album_units} • {album.format_name}
          </Text>
          <Text color="blue.600" fontSize="sm">
            {album.label_name}
          </Text>
          <Text color="blue.600" fontSize="m">
            {album.album_price} kr
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {user?.isAuthenticated && ( // Skjul knappen, hvis brugeren ikke er logget ind
          <Button
            variant="solid"
            colorScheme="blue"
            size="sm"
            onClick={() => addToCart(album)}
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default LPCard;
