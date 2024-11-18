import { SimpleGrid } from "@chakra-ui/react";
import useAlbums from "../hooks/useAlbums";
import LPCard from "./LPCard";
import LPCardContainer from "./LPCardContainer";
import LPCardSkeleton from "./LPCardSkeleton";
import { LpQuery } from "../App";

interface Props {
  lpQuery: LpQuery;
}

const LPGrid = ({ lpQuery }: Props) => {
  const { data: albums, error, isLoading } = useAlbums(lpQuery);

  const skeletons = [...Array(20).keys()];

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={3}
      padding={10}
    >
      {error && <p>{error}</p>}

      {isLoading &&
        skeletons.map((skeleton) => (
          <LPCardContainer key={skeleton}>
            <LPCardSkeleton />
          </LPCardContainer>
        ))}

      {albums.map((album) => (
        <LPCardContainer key={album.album_id}>
          <LPCard album={album} />
        </LPCardContainer>
      ))}
    </SimpleGrid>
  );
};
export default LPGrid