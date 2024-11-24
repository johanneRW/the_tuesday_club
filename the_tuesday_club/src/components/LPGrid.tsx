import { SimpleGrid } from "@chakra-ui/react";
import useAlbums, { Album } from "../hooks/useAlbums";
import LPCard from "./LPCard";
import LPCardContainer from "./LPCardContainer";
import LPCardSkeleton from "./LPCardSkeleton";
import LoadMoreButton from "./LoadMoreButton";
import { LpQuery } from "../App";
import { useState, useEffect } from "react";

interface Props {
  lpQuery: LpQuery; // De filtre brugeren vælger
}

const LPGrid = ({ lpQuery }: Props) => {
  const [currentPage, setCurrentPage] = useState(1); // Holder styr på den aktuelle side
  const [allAlbums, setAllAlbums] = useState<Album[]>([]); // Gemmer alle hentede albums

  const { albums, totalPages, isLoading, error } = useAlbums(lpQuery, currentPage);

  // Reset når lpQuery ændres
  useEffect(() => {
    setAllAlbums([]); // Ryd tidligere albums
    setCurrentPage(1); // Gå tilbage til første side
  }, [lpQuery]);

  // Tilføj nye albums til eksisterende
  useEffect(() => {
    if (albums) {
      setAllAlbums((prevAlbums) => [...prevAlbums, ...albums]);
    }
  }, [albums]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const skeletons = [...Array(20).keys()]; 

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={3} padding={10}>
        {error && <p>{error}</p>}

        {isLoading && currentPage === 1 &&
          skeletons.map((skeleton) => (
            <LPCardContainer key={skeleton}>
              <LPCardSkeleton />
            </LPCardContainer>
          ))}

        {/* Vis alle albums */}
        {allAlbums.map((album) => (
          <LPCardContainer key={album.album_id}>
            <LPCard album={album} />
          </LPCardContainer>
        ))}

        {/* Besked hvis ingen albums findes */}
        {!isLoading && allAlbums.length === 0 && <p>No albums found.</p>}
      </SimpleGrid>
      
      <LoadMoreButton
        isLoading={isLoading}
        hasMore={currentPage < totalPages}
        onLoadMore={handleLoadMore}
      />
    </>
  );
};

export default LPGrid;
