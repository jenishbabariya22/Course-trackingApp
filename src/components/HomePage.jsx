import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box textAlign="center" py={10}>
      <Heading as="h1" size="xl" mb={5}>Featured Courses</Heading>
      <Text fontSize="lg">Explore our top courses and start learning today!</Text>
      <Link to="/catalog">
        <Button colorScheme="blue" mt={5}>Browse Courses</Button>
      </Link>
    </Box>
  );
};

export default HomePage;
