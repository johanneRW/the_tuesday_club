import { Grid, GridItem } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import HomePage from "./pages/HomePage"; 
import CartPage from "./pages/CartPage"; 
import { CartProvider } from "./components/CartContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPages";

function App() {
  return (
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
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />   
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />      
            </Routes>
          </GridItem>

          {/* Footer */}
          <GridItem area={"footer"}>
          </GridItem>
        </Grid>
      </Router>
    </CartProvider>
  );
}

export default App;
