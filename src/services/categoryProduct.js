import axios from "../helper/axios";
const getAllCategoryProduct = async (currentPage = 1, perpage = 3) => {
  try {
    const response = await axios.get(
      `master/product-category?page=${currentPage}&page_size=${perpage}`
    );
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
const getSpesifikCategoryProduct = async (id) => {
  try {
    const response = await axios.get(
      `master/product-category/${id}`
    );
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

const storeCategoryProduct = async (data) => {
  try {
    const response = await axios.post("/master/product-category", data);
    return response.data.items;
  } catch (e) {
    return e.response.data;
  }
};

const updateCategoryProduct = async (data) => {
  const response = await axios.put(`/master/product-category`, data);
  return response.data;
};

const deleteCategoryProduct = async (id) => {
  try {
    const response = await axios.delete(`/master/product-category/${id}`);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

export {
  getAllCategoryProduct,
  storeCategoryProduct,
  updateCategoryProduct,
  deleteCategoryProduct,
  getSpesifikCategoryProduct
};
