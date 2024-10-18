import { Box, Flex, Button, Stack, useBreakpointValue, Switch, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // Get color mode and toggle function

  // Responsive font size for the logo
  const headerFontSize = useBreakpointValue({ base: 'md', md: 'lg' });

  return (
    <Box 
      bg="teal.500" 
      px={4} 
      pt={{ base: '50px', sm: '0' }} // Padding top for screens <= 515px
      pb={{ base: '100px', sm: '0' }} // Padding bottom for screens <= 515px
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }} // Stack vertically on small screens
      >
        {/* Logo Link */}
        <RouterLink to="/">
          <Button 
            variant="link" 
            color="white" 
            fontSize={headerFontSize} // Responsive font size
            _hover={{ textDecoration: 'underline', color: 'teal.200' }} // Hover effect
          >
            CourseApp
          </Button>
        </RouterLink>
        
        {/* Navigation Buttons */}
        <Stack 
          direction={{ base: 'column', md: 'row' }} // Change direction based on screen size
          alignItems="center"
          spacing={{ base: 2, md: 4 }} // Spacing between buttons
          mt={{ base: 4, md: 0 }} // Margin on small screens
        >
          <RouterLink to="/catalog">
            <Button 
              variant="link" 
              color="white" 
              _hover={{ 
                padding: "10px",
                color: 'teal.200', 
                bg: 'white', // Change background color on hover
                borderRadius: 'md', 
                transform: 'scale(1.05)', 
                transition: 'transform 0.2s ease', 
              }}
            >
              Course Catalog
            </Button>
          </RouterLink>
          
          <RouterLink to="/dashboard">
            <Button 
              variant="link" 
              color="white" 
              _hover={{ 
                padding: "10px",
                color: 'teal.200', 
                bg: 'white', 
                borderRadius: 'md', 
                transform: 'scale(1.05)', 
                transition: 'transform 0.2s ease', 
              }}
            >
              Dashboard
            </Button>
          </RouterLink>
          
          {/* Color Mode Switch */}
          <Switch
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
            colorScheme="teal"
            mt={{ base: 2, md: 0 }} // Add margin on small screens
          />
        </Stack>
      </Flex>
    </Box>
  );
};

export default Header;
