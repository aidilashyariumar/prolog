import axios from '../helper/axios'
const getAllProduct = async () => {

    try {

        const response = await axios.get('master/product?page=1&page_size=3&id_business_unit=5c28924d-7c5b-42f5-8ad5-b0de8b346eb9')
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

