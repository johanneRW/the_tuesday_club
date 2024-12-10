import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Box,
  Button,
  HStack,
} from "@chakra-ui/react";
import ImagePlaceholder from "./ImagePlaceholder";
import { useCart } from "../context/CartContext";
import { Album } from "../../hooks/grid/useAlbums";
import { capitalizeWords } from "../../services/utils/capitalizeWords";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../NavBar/ProtectedRout";


interface Props {
  album: Album;
}

const LPCard = ({ album }: Props) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  return (
    <Card maxW="100%" h="460px" sx={{
      "--card-padding": "var(--chakra-space-4)", // Ændr card-padding
    }}>
      <CardBody>
        <Box display="flex" justifyContent="center">
          <ImagePlaceholder format={album.format_name} />
        </Box>
        <Stack mt="3" spacing="1">
          <Heading
            fontSize="xl"
            isTruncated
            noOfLines={1}
            title={album.album_name}
          >
            {capitalizeWords(album.album_name)}
          </Heading>
          <Text
            fontSize="l"
            isTruncated
            noOfLines={1}
            title={album.artist_name}
          >
            {capitalizeWords(album.artist_name)}
          </Text>
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
      <CardFooter
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="auto"
      >
        {user?.isAuthenticated && (
          <>
            {/* Superuser actions */}
            <ProtectedRoute requireSuperuser>
              <HStack spacing="4">
                <Button
                  variant="solid"
                  colorScheme="blue"
                  size="sm"
                  mb="4"
                  onClick={() => addToCart(album)}
                >
                  Add to cart
                </Button>
                <Button
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                  mb="4"
                  onClick={() => console.log("Superuser action")}
                >
                  Fetch Image
                </Button>
              </HStack>
            </ProtectedRoute>

            {/* Normal user action */}
            {!user.isSuperuser && (
              <Button
                variant="solid"
                colorScheme="blue"
                size="md"
                width="80%"
               
                onClick={() => addToCart(album)}
              >
                Add to cart
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default LPCard;
