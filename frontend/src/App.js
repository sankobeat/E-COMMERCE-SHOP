import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrdersListScreen from "./screens/OrdersListScreen";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/orders/:id" component={OrderScreen} />
          <Route path="/admin/orders" component={OrdersListScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />

          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
