import { FC } from "react";
import { Box, Image } from "@chakra-ui/react";
import ImagePlaceholder from "./ImagePlaceholder";

interface AlbumImageProps {
  imageUrl: string | null;
  format: string;
  alt: string;
}

const AlbumImage: FC<AlbumImageProps> = ({ imageUrl, format, alt }) => {
  return (
    <Box display="flex" justifyContent="center">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          objectFit="cover"
          width="210px"
          height="210px"
          borderRadius="md"
        />
      ) : (
        <ImagePlaceholder format={format} />
      )}
    </Box>
  );
};

export default AlbumImage;
