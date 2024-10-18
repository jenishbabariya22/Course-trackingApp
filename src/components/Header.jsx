import { Box, Flex, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <Box bg="teal.500" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent={{ base: "center", md: "space-between" }} // Center on small screens, space-between on larger screens
        flexDirection={{ base: "column", md: "row" }} // Stack vertically on small screens
      >
        <RouterLink to="/">
          <Button variant="link" color="white" fontSize="lg" _hover={{ textDecoration: 'underline', color: 'teal.200' }}>
            CourseApp
          </Button>
        </RouterLink>
        <Flex alignItems="center" mt={{ base: 4, md: 0 }}> {/* Add margin on small screens */}
          <RouterLink to="/catalog">
            <Button 
              variant="link" 
              color="white" 
              style={{transition:"0.5s"}}
              mr={4} 
              _hover={{ 
                padding:"10px",
                color: 'teal.200', 
                bg: 'white', // Change background color on hover
                borderRadius: 'md', // Optional: add rounded corners
                transform: 'scale(1.05)', // Optional: slightly scale the button
                transition: 'transform 0.5s ease', // Smooth transition for scaling
              }}
            >
              Course Catalog
            </Button>
          </RouterLink>
          <RouterLink to="/dashboard">
            <Button 
            style={{transition:"0.5s"}}
              variant="link" 
              color="white" 
              _hover={{ 
                padding:"10px",
                color: 'teal.200', 
                bg: 'white', // Change background color on hover
                borderRadius: 'md', // Optional: add rounded corners
                transform: 'scale(1.05)', // Optional: slightly scale the button
                transition: 'transform 0.2s ease', // Smooth transition for scaling
              }}
            >
              Dashboard
            </Button>
          </RouterLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
