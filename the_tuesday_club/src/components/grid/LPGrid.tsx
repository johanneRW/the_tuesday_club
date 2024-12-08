import { Alert, AlertIcon, Box, SimpleGrid } from "@chakra-ui/react";
import LPCard from "./LPCard";
import LPCardContainer from "./LPCardContainer";
import LPCardSkeleton from "./LPCardSkeleton";
import LoadMoreButton from "./LoadMoreButton";
import { useState, useEffect } from "react";
import useAlbums, { Album } from "../../hooks/grid/useAlbums";
import { LpQuery } from "../../pages/HomePage";
import { useAuth } from "../context/AuthContext";



interface Props {
  lpQuery: LpQuery;
}

const LPGrid = ({ lpQuery }: Props) => {
 
  const [currentPage, setCurrentPage] = useState(1); // Holder styr på den aktuelle side
  const [allAlbums, setAllAlbums] = useState<Album[]>([]); // Gemmer alle hentede albums
  const { user } = useAuth();
  const { albums, totalPages, isLoading, error } = useAlbums(lpQuery, currentPage);

  // Reset albums, når lpQuery ændres
  useEffect(() => {
    setAllAlbums([]); // Ryd tidligere albums
    setCurrentPage(1); // Gå tilbage til første side
  }, [lpQuery]);

  // Tilføj nye albums til listen, når albums fra API ændres
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
    <Box>
    {/* Vis besked, hvis brugeren ikke er logget ind */}
    {!user?.isAuthenticated && (
      <Alert status="info" mb="4" borderRadius="md">
        <AlertIcon />
        Log in to be able to add to your lp-pile.
      </Alert>
    )}
    
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} spacing={3} padding={10}>
        {/* Fejlmeddelelse */}
        {error && <p>{error}</p>}

        {/* Vis skeletter, hvis der indlæses på første side */}
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
      
      {/* Load More-knap */}
      <LoadMoreButton
        isLoading={isLoading}
        hasMore={currentPage < totalPages}
        onLoadMore={handleLoadMore}
      />
    </Box>
  );
};

export default LPGrid;
