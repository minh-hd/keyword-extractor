import { Box, Flex, Image, Text } from '@chakra-ui/react';
import logo from '../assets/openai.png';

const Footer = () => {
  return (
    <>
      <Box mt={50}>
        <Flex alignItems='center' justifyContent='center'>
          <Image src={logo} mr={3} />
          <Text>Powered By OpenAI</Text>
        </Flex>
      </Box>
    </>
  );
};

export default Footer;
