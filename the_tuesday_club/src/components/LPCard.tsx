import { Card, CardBody, Heading, HStack } from "@chakra-ui/react";
import { Album } from "../hooks/useAlbums";

interface Props {
  album: Album;
}

const LPCard = ({ album }: Props) => {
  console.log('lp-card' + album)
  return (
    <Card>
      <CardBody>
        <Heading fontSize="2xl">{album.album_name}</Heading>
        <HStack justifyContent="space-between">
        </HStack>
      </CardBody>
    </Card>
  );
};

export default LPCard;
