import { Box, Heading, Button, Text, useToast, SimpleGrid, Card, CardBody, Image, Stack, Divider, Input, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CourseContext } from '../context/CourseContext';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const UserDashboard = () => {
  const { enrolledCourses, removeCourse, saveReview } = useContext(CourseContext);
  const [reviewText, setReviewText] = useState('');
  const toast = useToast();
  const { t, i18n } = useTranslation(); // Initialize useTranslation

  // Handle language change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleViewCourse = (course) => {
    toast({
      title: t("Viewing Course"),
      description: `${t("You are now viewing the course")}: ${course.title}.`,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleWatchLesson = (course) => {
    toast({
      title: t("Watching Lesson"),
      description: `${t("You are now watching the lesson for")}: ${course.title}.`,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleRemoveCourse = (course) => {
    removeCourse(course.id);
    toast({
      title: t("Course Removed"),
      description: `${course.title} ${t("has been removed from your enrolled courses")}.`,
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleReviewSubmit = (courseId) => {
    saveReview(courseId, reviewText);
    setReviewText(''); // Clear the input field
    toast({
      title: t("Review Submitted"),
      description: t("Your review has been submitted."),
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleDownloadCertificate = (course) => {
    const certificateContent = `
      ${t("Certificate of Completion")}
      ${t("This certifies that the student has successfully completed the course")}: ${course.title}.
    `;
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.title}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box p={{ base: 4, md: 6 }} maxW="1200px" mx="auto">
      <Heading as="h2" mb={5} textAlign="center">{t("Your Enrolled Courses")}</Heading>
      
      {/* Language Toggle Button */}
      <HStack justifyContent="center" mb={5}>
        <Button onClick={() => changeLanguage('en')} colorScheme="blue">
          English
        </Button>
        <Button onClick={() => changeLanguage('fr')} colorScheme="blue">
          Français
        </Button>
        {/* Add other languages as needed */}
      </HStack>

      {enrolledCourses.length === 0 ? (
        <Text textAlign="center" fontStyle="italic">{t("You haven't enrolled in any courses yet.")}</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
          {enrolledCourses.map(course => (
            <Card key={course.id} borderWidth="1px" borderRadius="lg" boxShadow="lg">
              <CardBody>
                <Image 
                  src={course.imageUrl} 
                  borderRadius="md" 
                  alt={course.title} 
                  height={{ base: "150px", md: "200px" }} // Responsive height
                  objectFit="cover" 
                  width="100%" 
                />
                <Stack mt={3} spacing={2}>
                  <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>{course.title}</Text>
                  <Text color="gray.600">{course.description}</Text>
                  <Divider />
                  <HStack spacing={4} mt={3}>
                    <Link to={`/course/${course.id}`} onClick={() => handleViewCourse(course)}>
                      <Button colorScheme="blue" variant="outline" width={{ base: "full", sm: "auto" }}>
                        {t("View Course")}
                      </Button>
                    </Link>
                    <Link to={`/lesson/${course.id}`} onClick={() => handleWatchLesson(course)}>
                      <Button colorScheme="green" variant="solid" width={{ base: "full", sm: "auto" }}>
                        {t("Watch Lesson")}
                      </Button>
                    </Link>
                  </HStack>
                  <HStack spacing={4} mt={2}>
                    <Button 
                      colorScheme="red" 
                      variant="outline" 
                      onClick={() => handleRemoveCourse(course)}
                      width={{ base: "full", sm: "auto" }}
                    >
                      {t("Remove Course")}
                    </Button>
                    <Button 
                      colorScheme="yellow" 
                      variant="solid" 
                      onClick={() => handleDownloadCertificate(course)}
                      width={{ base: "full", sm: "auto" }}
                    >
                      {t("Download Certificate")}
                    </Button>
                  </HStack>
                  <Input 
                    placeholder={t("Give your opinion...")} 
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    mt={3}
                  />
                  <Button 
                    colorScheme="teal" 
                    onClick={() => handleReviewSubmit(course.id)} 
                    mt={2}
                    width="full" // Make submit button full width
                  >
                    {t("Submit Review")}
                  </Button>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default UserDashboard;
