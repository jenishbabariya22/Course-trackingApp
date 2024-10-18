import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Button, useToast, VStack, HStack, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { useContext, useState } from 'react';
import { CourseContext } from '../context/CourseContext';
import { useNavigate } from 'react-router-dom';

const LessonPlayer = () => {
    const { lessonId } = useParams();
    const { enrolledCourses, markLessonCompleted } = useContext(CourseContext);
    const navigate = useNavigate();
    const toast = useToast();
    const [review, setReview] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    // Find the enrolled course by ID
    const course = enrolledCourses.find(course => course.id === lessonId);

    if (!course) {
        return <Text>Course not found or you are not enrolled in this course.</Text>;
    }

    const handleMarkCompleted = () => {
        markLessonCompleted(course.id);
        toast({
            title: "Lesson Completed",
            description: "You've marked this lesson as completed. Please provide your review.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
        });
        setModalOpen(true); // Open the review modal after marking the lesson as completed
    };

    const handleNextLesson = () => {
        // Navigate to the dashboard page directly
        navigate('/dashboard');
    };

    const handleSubmitReview = () => {
        // Submit the review logic (e.g., save it to your context or send it to the backend)
        console.log("Review submitted:", review);

        // Show success message
        toast({
            title: "Review Submitted",
            description: "Thank you for your review!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
        });

        setModalOpen(false); // Close the modal

        // Navigate to the dashboard page after submitting the review
        navigate('/dashboard');
    };

    return (
        <Box p={5}>
            <Heading as="h2" mb={4}>{course.title}</Heading>
            <VStack spacing={4} align="stretch">
                <HStack spacing={4} justify="center">
                    <Button colorScheme="teal" onClick={handleMarkCompleted}>
                        Mark as Completed
                    </Button>
                    <Button colorScheme="blue" onClick={handleNextLesson}>
                        Next Lesson
                    </Button>
                </HStack>
                <Box
                    className="player-wrapper"
                    maxW="full"
                    height="300px"
                    position="relative"
                    pb="56.25%"
                >
                    <ReactPlayer
                        url={course.videoUrl}
                        className="react-player"
                        controls={true}
                        width="100%"
                        height="65%"
                        style={{ position: "absolute", top: 0, left: 0 }}
                    />
                </Box>
            </VStack>

            {/* Review Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Submit Your Review</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Write your review here..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            mb={4}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleSubmitReview}>
                            Submit Review
                        </Button>
                        <Button colorScheme="gray" onClick={() => setModalOpen(false)} ml={3}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default LessonPlayer;
