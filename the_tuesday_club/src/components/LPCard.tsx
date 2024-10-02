import { Card, CardBody, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from "@chakra-ui/react";
import LPPlaceholder from "./LPPlaceholder";

const LPCard = () => {
  return (
    <Card maxW='250px' h='460px'> 
      <CardBody>
        <LPPlaceholder />
        <Stack mt='3' spacing='1'>
          <Heading size='lg' lineHeight='short'> 
            album name
          </Heading>
          <Text fontSize='sm' lineHeight='short'>
            album artist
          </Text>
          <Text fontSize='sm' lineHeight='short'>
            album label
          </Text>
          <Text color='blue.600' fontSize='m'> 
            XX kr
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue' size='sm'>
            Add to cart
          </Button>
          <Button variant='ghost' colorScheme='blue' size='sm'>
            Add to wishlist
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default LPCard;
