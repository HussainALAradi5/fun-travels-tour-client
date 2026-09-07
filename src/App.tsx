import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { useColorModeValue } from "./components/ui/color-mode";
import { AuthProvider } from "./utilities/AuthContext";
import { Toaster } from "./components/ui/toaster";
import { AppRoutes } from "./components/routes/AppRoutes";
import { NotificationProvider } from "./utilities/NotificationContext";

const AppContent = () => {
  const bgColor = useColorModeValue("gray.50", "gray.950");

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={bgColor}>
      <NavBar />
      <Box as="main" flex="1">
        <AppRoutes />
      </Box>
      <Footer />
      <Toaster />
    </Box>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider> {/* Add this here */}
        <Router>
          <AppContent />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}