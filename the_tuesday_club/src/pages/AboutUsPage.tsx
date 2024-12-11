import { Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <Box maxW="800px" mx="auto" mt="10" p="6" border="1px solid #ddd" borderRadius="8px">
    <Box textAlign="left" mt="10" >
      <Heading size="lg" mb="6">
      Welcome to the Club
      </Heading>
      <Text >
      The Tuesday Club is a meeting place where vinyl LP fans gather and discover new records.<br/>
      <br/>
      The Tuesday Club is a community for vinyl LP fans where you can explore and order new records. <br/> 
      We offer a selection of new releases, reissues, and other exciting titles – all records are brand new, no second-hand.<br/> 
      <br/> 
      <br/> 
      Orders are placed in your personal stack: Here, you can add as many or as few records as you like and decide when you want to receive them. <br/> 
      This is a way to save on shipping costs compared to buying records individually from traditional webshops. 
      <br/> 
      If you only want a single record, that's perfectly fine too – there is no minimum purchase requirement.
      <br/>
      <br/>
      A stack can remain open for up to 3 months or until it reaches 3,000 DKK. At that point, I will notify you that it's time to clear the stack, and you can start a new one if you wish.<br/> <br/> If there are any specific titles you're interested in, feel free to reach out to me. I’ll find a price for you, and you can decide if you want to place an order.
      <br/> 
      I can also source most titles that are still available for sale. So, if there's a recent release you missed out on, I can probably help you with that too.
      <br/> 
      <br/> 
      <br/> 
      Please note: It is not possible to cancel an order once placed, so only order if you’re sure you want to buy the record(s) added to your stack.
      <br/> 
      Also, be aware that some titles may be delayed by the label (what is known as backorders) if demand is high. In such cases, I will notify you and keep you updated on the status.
      <br/> 
      <br/> I look forward to welcoming you to the club.
      </Text>
    </Box>
    </Box>
  );
};

export default AboutUsPage;
