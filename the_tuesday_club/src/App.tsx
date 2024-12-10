import { Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Banner from "./components/common/Banner";
import HomePage from "./pages/HomePage"; 
import CartPage from "./pages/CartPage"; 
import { CartProvider } from "./components/context/CartContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPages";
import AdminDashboardPage from "./pages/admin/AdminDashBoardPage";
import ProtectedRoute from "./components/NavBar/ProtectedRout";
import { AuthProvider } from "./components/context/AuthContext";
import EditProfilePage from "./pages/profile/EditProfilePage";
import ManageOpenPileItemsPage from "./pages/admin/ManageOpenPileItemsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage"; 
import ManageOrderdPileItemsPage from "./pages/admin/ManageOrderdPileItemsPage";
import ManageOrderSendingPage from "./pages/admin/ManageOrderSendingPage";
import AboutUsPage from "./pages/AboutUsPage";

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
                <Route path="/aboutus" element={<AboutUsPage />} />
               
                
                {/* Protected routes for regular users */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-profile"
                  element={
                    <ProtectedRoute>
                      <EditProfilePage />
                    </ProtectedRoute>
                  }
                />
                
                {/* Protected routes for superusers */}
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
                <Route
                  path="/manage-orderd-pile-items"
                  element={
                    <ProtectedRoute requireSuperuser>
                      <ManageOrderdPileItemsPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/manage-order-sending"
                  element={
                    <ProtectedRoute requireSuperuser>
                      <ManageOrderSendingPage />
                    </ProtectedRoute>
                  }
                />


                {/* Fallback route */}
                <Route path="*" element={<NotFoundPage />} />
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
