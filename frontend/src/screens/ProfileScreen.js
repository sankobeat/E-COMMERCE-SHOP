import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { useHistory } from "react-router-dom";

const ProfileScreen = ({ location }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  //get user details
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  // check if user is logged in
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // get success from userDetails
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  // redirect if user is logged in
  const redirect = location.search ? location.search.split("=")[1] : "/";
  //before rendering component it check if user is logged in & if it is logged in it will redirect him
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        console.log(user.name, user.email);
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, redirect, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match!");
    } else {
      // DISPATCH UPDATE PROFILE
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name "
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Adress</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm your password "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-3">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>orders</h1>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
