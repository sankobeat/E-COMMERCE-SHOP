import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listProduct,
  createProduct,
  deleteProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constatns/productConstants";

const ProductListScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, pages, page } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);

  const {
    loading: createdProductLoading,
    success: createdProductSuccess,
    createdProduct,
    error: createdProductError,
  } = productCreate;

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (createdProductSuccess) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProduct("", pageNumber));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, history, userInfo, createdProduct?._id, pageNumber]);

  const deleteHandler = (productId) => {
    if (window.confirm("are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <>
      <Row className="alight-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            Create Product <i className="fas fa-plus"></i>
          </Button>
        </Col>
      </Row>
      <h1>Products</h1>
      {createdProductLoading && <Loader />}
      {createdProductError && (
        <Message variant="danger">{createdProductError}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i> EDIT
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      {" "}
                      <i className="fas fa-trash"></i>{" "}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
