import { Grid, GridItem } from "@chakra-ui/react";
import LPGrid from "../components/grid/LPGrid";
import { useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import Aside from "../components/filters/aside";
import { AlbumArtist } from "../hooks/filters/useAlbumArtists";
import { AlbumFormat } from "../hooks/filters/useAlbumFormats";
import { AlbumUnit } from "../hooks/filters/useAlbumUnits";
import { AlbumLabel } from "../hooks/filters/useAlbumLabels";


export interface LpQuery {
  albumUnits: AlbumUnit[];
  albumFormats: AlbumFormat[];
  albumLabels: AlbumLabel[];
  albumArtists: AlbumArtist[];
  priceRange: [number, number] | undefined;
  page: number | undefined;
  search_string: string;
}

const HomePage = () => {
  useAuth();
  const [lpQuery, setLpQuery] = useState<LpQuery>({} as LpQuery);

  const handleSearch = (searchString: string) => {
    setLpQuery((prev) => ({
      ...prev,
      search_string: searchString, // Opdater søgeparameteren
      page: 1, // Nulstil pagination
    }));
  };

  return (
    <Grid
    templateAreas={`
      "aside main"`}
    gridTemplateColumns={"280px 1fr"}
    gap="4"
    p="4"
  >
      {/* Sidebar */}
      <GridItem
        area={"aside"}
                position="sticky" // Gør det sticky
        top="0" // Sticky starter fra toppen af viewporten
        height="100vh" // Fylder hele højden af viewporten
        overflowY="auto" // Hvis indholdet i Aside er større, aktiver scrolling
      >
        <Aside lpQuery={lpQuery} setLpQuery={setLpQuery} handleSearch={handleSearch} />
      </GridItem>

      {/* Main Content */}
      <GridItem area={"main"}>
        <LPGrid lpQuery={lpQuery} />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
