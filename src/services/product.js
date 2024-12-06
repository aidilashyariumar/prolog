import axios from '../helper/axios'
const getAllProduct = async (currentPage = 1, perpage = 3) => {

    try {

        const response = await axios.get(`master/product?page=${currentPage}&page_size=${perpage}`)
        return response.data

    } catch (e) {
        return e.response.data
    }

}


const storeCategoryProduct = async (data) => {
    try {
        const response = await axios.post('/master/product', data)
        return response.data.items

    } catch (e) {
        return e.response.data
    }

}

const updateCategoryProduct = async (data) => {

    try {

        const response = await axios.put(`/master/product-category/${data.id}`, data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

const deleteProduct = async (id) => {

    try {

        const response = await axios.delete(`/master/product/${id}`)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

export { getAllProduct, storeCategoryProduct, updateCategoryProduct, deleteProduct }

