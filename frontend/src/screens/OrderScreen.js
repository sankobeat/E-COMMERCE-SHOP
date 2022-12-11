import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, ListGroup, Image, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  getOrderDefails,
  payOrder,
} from "../actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constatns/orderConstants";

const OrderScreen = ({ match }) => {
  // initiate dispatch
  // useEffect(() => {
  //   if (!order || order._id !== orderId) {
  //     dispatch(getOrderDefails(orderId));
  //   }
  // }, [order, orderId]);
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  //
  // getting order details
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;
  // getting success from our order state
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;
  //
  const dispatch = useDispatch();
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [orderId, successPay, order, dispatch]);

  const successPaymentHandler = (paymentResault) => {
    dispatch(payOrder(orderId, paymentResault));
  };

  //   const placeOrderHandler = () => {
  //     dispatch(
  //       createOrder({
  //         orderItems: cart.cartItems,
  //         shippingAddress: cart.shippingAddress,
  //         paymentMethod: cart.paymentMethod,
  //         itemsPrice: cart.ItemsPrice,
  //         shippingPrice: cart.shippingPrice,
  //         taxPrice: cart.taxPrice,
  //         totalPrice: cart.totalPrice,
  //       })
  //     );
  //   };
  if (!loading) {
    order.ItemsPrice = order.orderItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>Order {order._id}</h2>
      <Row>
        <Col md="8">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: {order.user.name}</strong>
              </p>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered at {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Cart Is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup key={index}>
                      <Row className="py-3">
                        <Col md={3}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <Col md={4}>
                            {item.quantity} x ${item.price} = $
                            {(item.quantity * item.price).toFixed(2)}
                          </Col>
                        </Col>
                      </Row>
                    </ListGroup>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Our Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.ItemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
