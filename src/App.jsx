import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Quiz from './pages/Quiz';
import TherapistDirectory from './pages/TherapistDirectory';
import Appointments from './pages/Appointments';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';
import { ThemeProvider } from "@material-tailwind/react";

const theme = {
  button: {
    defaultProps: {
      color: "primary",
      size: "md",
      variant: "filled",
    },
    styles: {
      variants: {
        filled: {
          primary: {
            background: "#BE8B69",
            color: "white",
          },
        },
      },
    },
  },
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider value={theme}>
        <Router>
          <div className="min-h-screen flex flex-col bg-lightGray">
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/:topic" element={<ResourceDetail />} />
                <Route path="/therapists" element={<TherapistDirectory />} />
                <Route path="/appointments" element={<Appointments />} />
                
                {/* Protected Routes */}
                {/* <Route
                  path="/therapists"
                  element={
                    <ProtectedRoute>
                      <TherapistDirectory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/appointments"
                  element={
                    <ProtectedRoute>
                      <Appointments />
                    </ProtectedRoute>
                  }
                /> */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
