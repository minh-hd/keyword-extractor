import { Button, Textarea, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const TextInput = ({ extractKeywords }) => {
  const [text, setText] = useState('');

  const toast = useToast();

  const submitText = () => {
    if (!text.trim().length) {
      toast({
        title: 'Text field is empty.',
        description: 'Please enter some text to extract keywords',
        status: 'error',
        duration: 3000,
        isClosable: false
      });

      return;
    }

    extractKeywords(text);
  };

  return (
    <>
      <Textarea
        bg="white"
        p={4}
        mt={6}
        h={200}
        color="blue.500"
        value={text}
        placeholder='Enter your paragraph here...'
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        bg="blue.500"
        color="white"
        mt={4}
        w="100%"
        _hover={{ bg: 'blue.700' }}
        onClick={submitText}
      >
        Extract Keywords
      </Button>
    </>
  );
};

export default TextInput;
