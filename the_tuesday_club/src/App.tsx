import { Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import HomePage from "./pages/HomePage"; 
import CartPage from "./pages/CartPage"; 
import { CartProvider } from "./components/CartContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPages";
import AdminDashboardPage from "./pages/AdminDashBoardPage";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRout";


function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Grid
            templateAreas={`
              "banner banner"
              "nav nav"
              "main main"
              "footer footer"`}
            gridTemplateRows={"auto auto 1fr auto"}
            h="100vh"
            gap="1"
            fontWeight="bold"
          >
            {/* Banner */}
            <GridItem area={"banner"}>
              <Banner />
            </GridItem>

            {/* Navigation */}
            <GridItem area={"nav"}>
              <NavBar />
            </GridItem>

            {/* Main Content */}
            <GridItem area={"main"}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected route for regular users */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />

                {/* Protected route for superusers */}
                <Route
                  path="/admindashboard"
                  element={
                    <ProtectedRoute requireSuperuser>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </GridItem>

            {/* Footer */}
            <GridItem area={"footer"}></GridItem>
          </Grid>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
