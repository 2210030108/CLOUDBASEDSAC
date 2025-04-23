import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Button, 
  TextField, 
  CardContent, 
  Chip, 
  Typography, 
  Rating, 
  Alert, 
  Snackbar,
  Divider,
  Box,
  CircularProgress,
  Grid,
  Card,
  IconButton,
  Avatar
} from '@mui/material';
import { 
  Loader2, 
  ChevronRight, 
  BookOpen, 
  User, 
  GraduationCap, 
  Calendar, 
  Search,
  Video,
  Info,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

// Enhanced subject data with more details
const departmentsData = {
  CSE: {
    name: "Computer Science & Engineering",
    icon: "💻",
    color: "from-blue-500 to-indigo-600",
    hoverColor: "from-blue-600 to-indigo-700",
    textColor: "text-blue-50",
    subjects: [
      { name: 'Programming Fundamentals', key: 'cse_pf', icon: '💻', description: 'Learn the basics of programming with Python, Java and C++' },
      { name: 'Web Development', key: 'cse_web', icon: '🌐', description: 'Master HTML, CSS, JavaScript and modern frameworks' },
      { name: 'Artificial Intelligence', key: 'cse_ai', icon: '🧠', description: 'Explore the world of AI, machine learning and neural networks' },
      { name: 'Data Structures', key: 'cse_ds', icon: '📊', description: 'Understand arrays, linked lists, trees, graphs and more' },
      { name: 'Algorithms', key: 'cse_algo', icon: '⚙️', description: 'Learn sorting, searching and optimization algorithms' }
    ]
  },
  ECE: {
    name: "Electronics & Communication",
    icon: "📡",
    color: "from-purple-500 to-pink-600",
    hoverColor: "from-purple-600 to-pink-700",
    textColor: "text-pink-50",
    subjects: [
      { name: 'Digital Electronics', key: 'ece_de', icon: '🔌', description: 'Study logic gates, flip-flops and digital circuits' },
      { name: 'Communication Systems', key: 'ece_cs', icon: '📡', description: 'Learn analog and digital communication techniques' },
      { name: 'VLSI Design', key: 'ece_vlsi', icon: '🔍', description: 'Design integrated circuits and semiconductor devices' },
      { name: 'Signal Processing', key: 'ece_sp', icon: '📊', description: 'Analyze and manipulate signals in various domains' }
    ]
  },
  EEE: {
    name: "Electrical & Electronics",
    icon: "⚡",
    color: "from-yellow-500 to-orange-600",
    hoverColor: "from-yellow-600 to-orange-700",
    textColor: "text-orange-50",
    subjects: [
      { name: 'Circuit Theory', key: 'eee_ct', icon: '⚡', description: 'Study of electrical networks and circuit analysis' },
      { name: 'Power Systems', key: 'eee_ps', icon: '🔋', description: 'Generation, transmission and distribution of electricity' },
      { name: 'Control Systems', key: 'eee_cs', icon: '⚙️', description: 'Analysis of system behavior and controller design' },
      { name: 'Electric Machines', key: 'eee_em', icon: '🔄', description: 'Study of motors, generators and transformers' }
    ]
  },
  AIDS: {
    name: "AI & Data Science",
    icon: "🤖",
    color: "from-green-500 to-teal-600",
    hoverColor: "from-green-600 to-teal-700",
    textColor: "text-teal-50",
    subjects: [
      { name: 'Data Science', key: 'aids_ds', icon: '📊', description: 'Statistical analysis, data visualization and interpretation' },
      { name: 'Machine Learning', key: 'aids_ml', icon: '🤖', description: 'Supervised and unsupervised learning algorithms' },
      { name: 'Deep Learning', key: 'aids_dl', icon: '📈', description: 'Neural networks, CNN, RNN and transformers' },
      { name: 'Big Data Analytics', key: 'aids_bda', icon: '📚', description: 'Processing and analyzing large datasets' }
    ]
  }
};

// Mock faculty data for demo purposes
const mockFacultyData = {
  cse_pf: [
    {
      _id: '1',
      enrolledteacher: {
        Firstname: 'Arun',
        Lastname: 'Kumar',
        Email: 'arun.kumar@example.com',
        IntroVideoUrl: 'https://example.com/video1.mp4',
        Education: 'PhD in Computer Science from IIT Delhi',
        Experience: '8 years',
        Location: 'Bangalore',
        Rating: 4.8,
        Specialization: 'Object-Oriented Programming',
        Certifications: ['Oracle Certified Java Programmer', 'Microsoft Certified Trainer']
      }
    },
    {
      _id: '2',
      enrolledteacher: {
        Firstname: 'Priya',
        Lastname: 'Sharma',
        Email: 'priya.sharma@example.com',
        IntroVideoUrl: 'https://example.com/video2.mp4',
        Education: 'MTech from NIT Trichy',
        Experience: '5 years',
        Location: 'Chennai',
        Rating: 4.6,
        Specialization: 'Python Programming',
        Certifications: ['Python Institute Certification', 'Google IT Automation with Python']
      }
    }
  ],
  ece_de: [
    {
      _id: '3',
      enrolledteacher: {
        Firstname: 'Ramesh',
        Lastname: 'Verma',
        Email: 'ramesh.verma@example.com',
        IntroVideoUrl: 'https://example.com/video3.mp4',
        Education: 'PhD in Electronics from IISc Bangalore',
        Experience: '12 years',
        Location: 'Hyderabad',
        Rating: 4.9,
        Specialization: 'Digital Logic Design',
        Certifications: ['IEEE Certified Electronics Engineer', 'VLSI Design Certification']
      }
    }
  ]
};

// Sample course data
const coursesData = [
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming with Python, perfect for beginners",
    thumbnail: "https://example.com/python-thumb.jpg", // Replace with actual image URL
    duration: "8 weeks",
    students: 1234,
    lessons: 24,
    rating: 4.8,
    instructor: {
      name: "Dr. Arun Kumar",
      avatar: "https://example.com/arun.jpg", // Replace with actual image URL
      designation: "Senior Professor"
    },
    tags: ["Programming", "Python", "Beginner"]
  },
  // Add more courses...
];

const CourseCard = ({ course }) => {
  return (
    <Card 
      sx={{ 
        minWidth: 320,
        maxWidth: 320,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        '&:hover': {
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'
        }
      }}
    >
      <Box 
        sx={{ 
          height: 160, 
          background: `url(${course.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '16px 16px 0 0'
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box className="flex items-center gap-2 mb-3">
          {course.tags.map(tag => (
            <Chip 
              key={tag} 
              label={tag} 
              size="small"
              sx={{ 
                backgroundColor: 'rgba(99,102,241,0.1)',
                color: '#6366f1',
                fontWeight: 500
              }}
            />
          ))}
        </Box>

        <Typography variant="h6" className="font-bold mb-2">
          {course.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-4">
          {course.description}
        </Typography>

        <Box className="flex items-center gap-4 mb-4">
          <Box className="flex items-center gap-1">
            <Clock size={16} className="text-gray-400" />
            <Typography variant="caption">{course.duration}</Typography>
          </Box>
          <Box className="flex items-center gap-1">
            <Users size={16} className="text-gray-400" />
            <Typography variant="caption">{course.students} students</Typography>
          </Box>
          <Box className="flex items-center gap-1">
            <BookOpen size={16} className="text-gray-400" />
            <Typography variant="caption">{course.lessons} lessons</Typography>
          </Box>
        </Box>

        <Divider className="mb-4" />

        <Box className="flex justify-between items-center">
          <Box className="flex items-center gap-2">
            <Avatar 
              src={course.instructor.avatar} 
              alt={course.instructor.name}
              sx={{ width: 32, height: 32 }}
            />
            <Box>
              <Typography variant="subtitle2" className="font-medium">
                {course.instructor.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {course.instructor.designation}
              </Typography>
            </Box>
          </Box>
          <Box className="flex items-center gap-1">
            <Star size={16} className="text-amber-400 fill-current" />
            <Typography variant="subtitle2" className="font-bold">
              {course.rating}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Courses = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const container = document.getElementById('courses-container');
    const scrollAmount = direction === 'left' ? -340 : 340;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setScrollPosition(container.scrollLeft + scrollAmount);
  };

  return (
    <Box className="relative">
      <Box 
        id="courses-container"
        className="flex gap-6 overflow-x-auto py-4 px-2 hide-scrollbar"
        sx={{
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }}
      >
        {coursesData.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </Box>

      {/* Scroll buttons */}
      <IconButton
        onClick={() => scroll('left')}
        sx={{
          position: 'absolute',
          left: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          '&:hover': { backgroundColor: 'white' }
        }}
      >
        <ArrowLeft />
      </IconButton>
      
      <IconButton
        onClick={() => scroll('right')}
        sx={{
          position: 'absolute',
          right: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          '&:hover': { backgroundColor: 'white' }
        }}
      >
        <ArrowRight />
      </IconButton>
    </Box>
  );
};

export default Courses;