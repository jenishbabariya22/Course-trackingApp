import { Box, Heading, Text, Button, SimpleGrid, Image, Input, HStack, Tag } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { CourseContext } from '../context/CourseContext';
import { useToast } from '@chakra-ui/react'; 
import { useNavigate } from 'react-router-dom'; 

const CourseCatalog = () => {
  const { availableCourses, enrollCourse } = useContext(CourseContext);
  const toast = useToast(); 
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedCategory, setSelectedCategory] = useState('All'); // Set default to 'All'

  const categories = ['All', 'Programming', 'Design', 'Marketing']; // Predefined categories

  // Handle course enrollment with redirection and toast notification
  const handleEnroll = (course) => {
    enrollCourse(course); 

    // Show a success notification
    toast({
      title: "Course Added.",
      description: `${course.title} has been successfully added to your dashboard.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

    // Redirect to the dashboard page
    navigate('/dashboard');
  };

  // Filter courses based on the search term and selected category
  const filteredCourses = availableCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || course.category.toLowerCase() === selectedCategory.toLowerCase())
  );

  return (
    <Box p={5}>
      <Heading as="h2" mb={5}>Course Catalog</Heading>

      {/* Search Bar */}
      <Input
        placeholder="Search for courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        mb={5}
      />

      {/* Category Filter */}
      <HStack spacing={4} mb={5}>
        {categories.map(category => (
          <Tag
            key={category}
            size="lg"
            variant={selectedCategory === category ? 'solid' : 'outline'}
            colorScheme={selectedCategory === category ? 'teal' : 'gray'}
            cursor="pointer"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Tag>
        ))}
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {filteredCourses.map(course => (
          <Box 
            key={course.id}
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <Image 
              src={course.imageUrl} 
              alt={course.title} 
              width="100%" 
              height="auto" 
              objectFit="cover"
              maxH="300px"
            />
            <Box p={4}>
              <Text fontWeight="bold" fontSize="lg">{course.title}</Text>
              <Text mt={2} color="gray.600">{course.description}</Text>
              <Button
                colorScheme='teal'
                color="white"
                bg="teal.500"
                mt={4}
                onClick={() => handleEnroll(course)} 
              >
                Enroll in Course
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CourseCatalog;
