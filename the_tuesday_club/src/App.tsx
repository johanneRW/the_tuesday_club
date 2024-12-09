import { Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Banner from "./components/common/Banner";
import HomePage from "./pages/HomePage"; 
import CartPage from "./pages/CartPage"; 
import { CartProvider } from "./components/context/CartContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPages";
import AdminDashboardPage from "./pages/AdminDashBoardPage";
import ProtectedRoute from "./components/NavBar/ProtectedRout";
import { AuthProvider } from "./components/context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ManageOpenPileItemsPage from "./pages/ManageOpenPileItemsPage";



function App() {
  return (
    <AuthProvider>
    <CartProvider>
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
                <Route path="/profile" element={<ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>}/>
                    <Route path="/edit-profile" element={<ProtectedRoute>
                      <EditProfilePage/>
                    </ProtectedRoute>}/>
                {/* Protected route for superusers */}
               
                 <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedRoute requireSuperuser>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />
                 <Route
                  path="/manage-open-pile-items"
                  element={
                    <ProtectedRoute requireSuperuser>
                      <ManageOpenPileItemsPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </GridItem>

            {/* Footer */}
            <GridItem area={"footer"}></GridItem>
          </Grid>
        </Router>
     
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
