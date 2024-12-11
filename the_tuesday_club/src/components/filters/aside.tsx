import { Checkbox, GridItem, VStack } from "@chakra-ui/react";
import useAlbumUnits from "../../hooks/filters/useAlbumUnits";
import useAlbumFormats from "../../hooks/filters/useAlbumFormats";
import useAlbumArtists from "../../hooks/filters/useAlbumArtists";
import useAlbumLabels from "../../hooks/filters/useAlbumLabels";
import SearchInput from "./searchBar";
import PriceSlider from "./PriceSlider";
import { usePriceRange } from "../../hooks/filters/usePriceRange";
import { LpQuery } from "../../pages/HomePage";
import CustomList from "../reusableComponents/CoustomList";

interface AsideProps {
  lpQuery: LpQuery; 
  setLpQuery: React.Dispatch<React.SetStateAction<LpQuery>>; 
  handleSearch: (searchString: string) => void;
}

const Aside = ({ lpQuery, setLpQuery, handleSearch }: AsideProps) => {
  return (
    <GridItem area={"aside"}>
      <SearchInput onSearch={handleSearch} />

      {/* Add sorting checkbox */}
      <VStack mt={4} alignItems="flex-start">
        <Checkbox
          isChecked={lpQuery.sortAlphabetical || false}
          onChange={(e) =>
            setLpQuery((prev) => ({
              ...prev,
              sortAlphabetical: e.target.checked,
            }))
          }
           fontWeight="normal" color="gray.400"
        >
          Sort Albums Alphabetically
        </Checkbox>
      </VStack>

      <CustomList
        title="Album Units"
        useDataHook={useAlbumUnits}
        selectedItems={lpQuery.albumUnits || []}
        onSelectItem={(selectedAlbumUnits) =>
          setLpQuery({ ...lpQuery, albumUnits: selectedAlbumUnits })
        }
      />

      <CustomList
        title="Album Formats"
        useDataHook={useAlbumFormats}
        selectedItems={lpQuery.albumFormats || []}
        onSelectItem={(selectedAlbumFormats) =>
          setLpQuery({ ...lpQuery, albumFormats: selectedAlbumFormats })
        }
      />

      <CustomList
        title="Album Labels"
        useDataHook={useAlbumLabels}
        selectedItems={lpQuery.albumLabels || []}
        onSelectItem={(selectedAlbumLabels) =>
          setLpQuery({ ...lpQuery, albumLabels: selectedAlbumLabels })
        }
      />

      <CustomList
        title="Album Artists"
        useDataHook={useAlbumArtists}
        selectedItems={lpQuery.albumArtists || []}
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
  );
};

export default Aside;
