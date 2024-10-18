import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CourseCatalog from './components/CourseCatalog';
import CourseDetail from './components/CourseDetail';
import UserDashboard from './components/UserDashboard';
import LessonPlayer from './components/LessonPlayer';
import Wishlist from './components/Wishlist';

function App() {
  return (
    <Router>
      <Header />
      <Box p={4}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CourseCatalog />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/lesson/:lessonId" element={<LessonPlayer />} />
          <Route path="/wishlist" element={<Wishlist/>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
