import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constatns/userConstants";
import {
  getUserDetailsByAdmin,
  updateUserProfileByAdmin,
} from "../actions/userActions";

const UserListScreen = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);

  //
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const updateByAdmin = useSelector((state) => state.updateByAdmin);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = updateByAdmin;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetailsByAdmin(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setAdmin(user.isAdmin);
      }
    }
  }, [
    dispatch,
    user.name,
    user._id,
    user.email,
    userId,
    user.isAdmin,
    updateSuccess,
    history,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfileByAdmin({ _id: userId, name, email, admin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Edit Name "
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Adress</Form.Label>
              <Form.Control
                type="email"
                placeholder="Edit Email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={admin}
                onChange={(e) => setAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserListScreen;
