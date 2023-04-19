import { Box, Container } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import TextInput from './components/TextInput';
import { useState } from 'react';
import KeywordsModal from './components/KeywordsModal';

function App() {
  const [keywords, setKeywords] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getOptions = (text) => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt:
          'Extract keywords from this text. Make the first letter of every word uppercase and separate with commas:\n\n' +
          text +
          '',
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.8,
        presence_penalty: 0.0,
      }),
    };
  };

  const extractKeywords = async (text) => {
    setLoading(true);
    setIsOpen(true);

    try {
      const response = await fetch(
        import.meta.env.VITE_OPENAI_API_URL,
        getOptions(text),
      );
      const result = await response.json();
      setKeywords(result.choices[0].text.trim());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box
      bg="blue.600"
      color="white"
      height="100vh"
      pt={130}
    >
      <Container
        maxW="3xl"
        centerContent
      >
        <Header />
        <TextInput extractKeywords={extractKeywords} />
        <Footer />
      </Container>
      <KeywordsModal
        keywords={keywords}
        loading={loading}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Box>
  );
}

export default App;
