import { Button, Spinner } from "@chakra-ui/react";

interface LoadMoreButtonProps {
  isLoading: boolean; // Indikerer, om der indlæses
  hasMore: boolean; // Tjekker, om der er flere sider at hente
  onLoadMore: () => void; // Funktion til at hente næste side
}

const LoadMoreButton = ({ isLoading, hasMore, onLoadMore }: LoadMoreButtonProps) => {
  if (!hasMore) return null; // Skjul knappen, hvis der ikke er flere sider

  return (
    <Button
      onClick={onLoadMore}
      colorScheme="blue"
      isDisabled={isLoading}
      marginY={4}
      width="100%"
    >
      {isLoading ? <Spinner size="sm" /> : "Load More"}
    </Button>
  );
};

export default LoadMoreButton;
