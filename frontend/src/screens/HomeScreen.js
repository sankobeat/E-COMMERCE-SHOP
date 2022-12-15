import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductsCarousel from "../components/ProductsCarousel";
import { Helmet } from "react-helmet";
const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  return (
    <>
      <Helmet>
        <title>Welcome to proshop | Home</title>
        <meta name="description" content="best shop" />
        <meta name="keyword" content="electronics, buy electronics" />
      </Helmet>
      <h1>Top Products</h1>
      <ProductsCarousel />
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm="12" md="6" lg="4" xl="3" key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
