import { Box, Heading, SimpleGrid, Card, CardBody, Text, Button, useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import { CourseContext } from '../context/CourseContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, enrollCourse } = useContext(CourseContext);
  const toast = useToast();

  const handleEnroll = (course) => {
    enrollCourse(course);
    toast({
      title: "Course Enrolled.",
      description: `${course.title} has been added to your dashboard.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleRemoveFromWishlist = (courseId) => {
    removeFromWishlist(courseId);
    toast({
      title: "Removed from Wishlist",
      description: "Course has been removed from your wishlist.",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Box p={5}>
      <Heading as="h2" mb={5}>Your Wishlist</Heading>
      {wishlist.length === 0 ? (
        <Text>You have no courses in your wishlist.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
          {wishlist.map(course => (
            <Card key={course.id} borderWidth="1px" borderRadius="lg" boxShadow="lg">
              <CardBody>
                <Text fontWeight="bold" fontSize="lg">{course.title}</Text>
                <Text color="gray.600">{course.description}</Text>
                <Button mt={3} colorScheme="teal" onClick={() => handleEnroll(course)}>
                  Enroll Now
                </Button>
                <Button mt={3} colorScheme="red" onClick={() => handleRemoveFromWishlist(course.id)}>
                  Remove from Wishlist
                </Button>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Wishlist;
