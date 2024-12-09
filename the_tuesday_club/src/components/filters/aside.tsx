import { GridItem } from "@chakra-ui/react";
import useAlbumUnits, { AlbumUnit } from "../../hooks/filters/useAlbumUnits";
import useAlbumFormats, { AlbumFormat } from "../../hooks/filters/useAlbumFormats";
import useAlbumArtists, { AlbumArtist } from "../../hooks/filters/useAlbumArtists";
import useAlbumLabels, { AlbumLabel } from "../../hooks/filters/useAlbumLabels";
import SearchInput from "./searchBar";
import CustomList from "./reusableComponents/CoustomList";
import PriceSlider from "./PriceSlider";
import { usePriceRange } from "../../hooks/filters/usePriceRange";
import { LpQuery } from "../../pages/HomePage";


interface AsideProps {
  lpQuery: {
    albumUnits: AlbumUnit[];
    albumFormats: AlbumFormat[];
    albumLabels: AlbumLabel[];
    albumArtists: AlbumArtist[];
    priceRange: [number, number] | undefined;
  };
  setLpQuery: React.Dispatch<React.SetStateAction<any>>;
  handleSearch: (searchString: string) => void;
}

const Aside = ({ lpQuery, setLpQuery, handleSearch }: AsideProps) => {
  return (
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
            setLpQuery((prev: LpQuery) => ({ ...prev, priceRange: range }))
          }
      />
    </GridItem>
  );
};

export default Aside;
