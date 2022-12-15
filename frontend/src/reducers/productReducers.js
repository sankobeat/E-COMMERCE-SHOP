import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILD,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILD,
  PRODUCT_CLEAR_DETAILS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILD,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILD,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_FAILD,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILD,
  PRODUCT_CREATE_REVIEW_RESET,
  TOP_PRODUCT_REQUEST,
  TOP_PRODUCT_SUCCESS,
  TOP_PRODUCT_FAILD,
  TOP_PRODUCT_RESET,
} from "../constatns/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAILD:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAILD:
      return { loading: false, error: action.payload };
    case PRODUCT_CLEAR_DETAILS:
      return { loading: true, product: {} };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, sucess: true, message: action.payload };
    case PRODUCT_DELETE_FAILD:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true, success: false };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, createdProduct: action.payload };
    case PRODUCT_CREATE_FAILD:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true, success: false };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAILD:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true, success: false };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAILD:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const topProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case TOP_PRODUCT_REQUEST:
      return { loading: true, success: false };
    case TOP_PRODUCT_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case TOP_PRODUCT_FAILD:
      return { loading: false, error: action.payload };
    case TOP_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
