import { Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <Box maxW="800px" mx="auto" mt="10" p="6" border="1px solid #ddd" borderRadius="8px">
    <Box textAlign="left" mt="10" >
      <Heading size="lg" mb="6">
      Velkommen i klubben.
      </Heading>
      <Text >

      Tirsdagsklubben er et samlingspunkt, hvor vinyl-LP fans samles og finder nye plader.<br/>
      <br/>
Tirsdagsklubben er et fællesskab for vinyl-LP fans, hvor du kan opdage og bestille nye plader. <br/>
Vi tilbyder et udvalg af nye udgivelser, genudgivelser og andre spændende titler – alle plader er nye, ingen second-hand.<br/>
<br/>
<br/>
Bestillinger hives hjem og lægges i din personlige bunke: Her kan du tilføje så mange eller så få plader du vil, og selv bestemme hvornår du vil have dine plader. <br/>
Dette er en måde at spare porto på i modsætning til, hvis man køber pladerne enkeltvis i traditionelle webshops. <br/>
Ønsker du blot en enkelt plade er det naturligvis også helt ok - der er intet krav om mindstekøb.<br/>
<br/>
En bunke kan være åben i op til 3 mdr. eller indtil den når 3.000 kr. Så giver jeg besked om at det tid til at tømme bunken, og du kan starte på en ny bunke, hvis du ønsker.<br/>
<br/>
Hvis der derudover er særlige titler du er interesseret i, så kan du skrive til mig. Så finder jeg en pris til dig og du kan vælge at bestille hvis du har lyst.<br/> 
Jeg kan også skaffe de fleste titler som stadigvæk er i salg. Så hvis der er en nyere udgivelse som du aldrig fik købt, så kan jeg sikkert også hjælpe på den front.<br/>
<br/>
<br/>
OBS: Det er ikke muligt at afbestille en bestilling, så bestil kun hvis du er sikker på at du ønsker at købe den/de plader du bestiller eller får lagt I din bunke. <br/>
Bemærk også at enkelte titler kan blive forsinkede fra selskabet (dét man kalder restordrer) hvis der er stor rift om dem, og i så fald giver jeg dig besked og holder dig opdateret om status.<br/>
<br/>
Jeg glæder mig til at byde dig velkommen i klubben<br/>


      </Text>
    </Box>
    </Box>
  );
};

export default AboutUsPage;
