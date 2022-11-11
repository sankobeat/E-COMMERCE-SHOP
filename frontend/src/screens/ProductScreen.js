import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const ProductScreen = ({ match }) => {
  const [singleProduct, setSingleProduct] = useState({});

  useEffect(() => {
    const getSignleProduct = async () => {
      const res = await axios.get(`/api/products/${match.params.id}`);
      setSingleProduct(res.data);
    };
    getSignleProduct();
  }, [match]);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={singleProduct.image} alt={singleProduct.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{singleProduct.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={singleProduct.rating}
                text={`${singleProduct.numReviews} reviews `}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${singleProduct.price}</ListGroup.Item>
            <ListGroup.Item>
              Description: {singleProduct.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${singleProduct.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {singleProduct.countInStock > 0
                      ? "In Stock"
                      : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={singleProduct.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
