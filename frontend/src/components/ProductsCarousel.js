import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { getTopProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const ProductsCarousel = () => {
  const dispatch = useDispatch();

  const topProducts = useSelector((state) => state.topProducts);
  const { loading, error, products } = topProducts;

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  console.log(products);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="img-fluid "
            />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
