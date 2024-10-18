import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { CourseContext } from '../context/CourseContext';

const CourseDetail = () => {
  const { id } = useParams();
  const { enrollCourse, enrolledCourses } = useContext(CourseContext);

  const course = { id, title: "React for Beginners", description: "Learn React from scratch." };

  const isEnrolled = enrolledCourses.some(c => c.id === course.id);

  return (
    <Box p={5}>
      <Heading as="h2">{course.title}</Heading>
      <Text mt={4}>{course.description}</Text>
      {!isEnrolled && (
        <Button colorScheme="green" mt={5} onClick={() => enrollCourse(course)}>
          Enroll Now
        </Button>
      )}
      {isEnrolled && (
        <Text mt={5} color="green.500">You are enrolled in this course.</Text>
      )}
    </Box>
  );
};

export default CourseDetail;
