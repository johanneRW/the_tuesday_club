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
  const { albums, error, isLoading } = useAlbums(lpQuery);

  // Brug skeletons, hvis der indlæses
  const skeletons = [...Array(20).keys()];

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
      spacing={3}
      padding={10}
    >
      {/* Fejlmeddelelse */}
      {error && <p>{error}</p>}

      {/* Viser skeletkort ved indlæsning */}
      {isLoading &&
        skeletons.map((skeleton) => (
          <LPCardContainer key={skeleton}>
            <LPCardSkeleton />
          </LPCardContainer>
        ))}

      {/* Vis albums når de er indlæst */}
      {!isLoading && albums.length > 0 &&
        albums.map((album) => (
          <LPCardContainer key={album.album_id}>
            <LPCard album={album} />
          </LPCardContainer>
        ))
      }

      {/* Vis besked hvis ingen albums opfylder søgningen */}
      {!isLoading && albums.length === 0 && (
        <p>No albums found.</p>
      )}
    </SimpleGrid>
  );
};

export default LPGrid;
