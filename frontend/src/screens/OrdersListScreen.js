import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getAllOrders } from "../actions/orderActions";
import axios from "axios";
import { useState } from "react";

const OrdersListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [isDelivered, setIsDelivered] = useState(false);
  const allOrdersList = useSelector((state) => state.allOrdersList);
  const { orders, loading, error } = allOrdersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleDelivered = async (id) => {
    // DELEIVERED
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/orders/${id}`, {}, config);
      if (data) {
        setIsDelivered(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if ((userInfo && userInfo.isAdmin) || isDelivered) {
      dispatch(getAllOrders());
    } else {
      history.push("/login");
    }
  }, [userInfo, dispatch, history, isDelivered]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>

                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/orders/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      DETAILS
                    </Button>
                  </Link>
                  <Button
                    variant="light"
                    className="btn-sm"
                    onClick={() => handleDelivered(order._id)}
                  >
                    MARK AS DELIVERED
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersListScreen;
