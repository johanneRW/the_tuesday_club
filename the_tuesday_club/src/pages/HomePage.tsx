import { Grid, GridItem } from "@chakra-ui/react";
import LPGrid from "../components/LPGrid";
import useAlbumUnits, { AlbumUnit } from "../hooks/useAlbumUnits";
import CustomList from "../components/reusableComponents/CoustomList";
import useAlbumFormats, { AlbumFormat } from "../hooks/useAlbumFormats";
import useAlbumLabels, { AlbumLabel } from "../hooks/useAlbumLabels";
import useAlbumArtists, { AlbumArtist } from "../hooks/useAlbumArtists";
import { usePriceRange } from "../hooks/usePriceRange";
import PriceSlider from "../components/PriceSlider";
import SearchInput from "../components/searchBar";
import { useState } from "react";

export interface LpQuery {
  albumUnits: AlbumUnit[];
  albumFormats: AlbumFormat[];
  albumLabels: AlbumLabel[];
  albumArtists: AlbumArtist[];
  priceRange: [number, number] | undefined;
  page: number | undefined;
  album_name: string;
}

const HomePage = () => {
  const [lpQuery, setLpQuery] = useState<LpQuery>({} as LpQuery);

  const handleSearch = (albumName: string) => {
    setLpQuery((prev) => ({
      ...prev,
      album_name: albumName, // Opdater søgeparameteren
      page: 1, // Nulstil pagination
    }));
  };

  return (
    <Grid
      templateAreas={`
        "aside main"`}
      gridTemplateColumns={"300px 1fr"}
      gap="4"
      p="4"
    >
      {/* Sidebar */}
      <GridItem area={"aside"}>
        <SearchInput onSearch={handleSearch} />

        <CustomList
          title="Album Units"
          useDataHook={useAlbumUnits}
          selectedItems={lpQuery.albumUnits}
          onSelectItem={(selectedAlbumUnits) =>
            setLpQuery({ ...lpQuery, albumUnits: selectedAlbumUnits })
          }
        />

        <CustomList
          title="Album Formats"
          useDataHook={useAlbumFormats}
          selectedItems={lpQuery.albumFormats}
          onSelectItem={(selectedAlbumFormats) =>
            setLpQuery({ ...lpQuery, albumFormats: selectedAlbumFormats })
          }
        />

        <CustomList
          title="Album Labels"
          useDataHook={useAlbumLabels}
          selectedItems={lpQuery.albumLabels}
          onSelectItem={(selectedAlbumLabels) =>
            setLpQuery({ ...lpQuery, albumLabels: selectedAlbumLabels })
          }
        />

        <CustomList
          title="Album Artists"
          useDataHook={useAlbumArtists}
          selectedItems={lpQuery.albumArtists}
          onSelectItem={(selectedAlbumArtists) =>
            setLpQuery({ ...lpQuery, albumArtists: selectedAlbumArtists })
          }
        />

        <PriceSlider
          title={"Price Range"}
          useDataHook={usePriceRange}
          selectedRange={lpQuery.priceRange}
          onSelectRange={(range) =>
            setLpQuery((prev) => ({ ...prev, priceRange: range }))
          }
        />
      </GridItem>

      {/* Main Content */}
      <GridItem area={"main"}>
        <LPGrid lpQuery={lpQuery} />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
