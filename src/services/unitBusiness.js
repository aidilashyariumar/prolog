import axios from '../helper/axios'

const getAllUnitBusiness = async (currentPage = 1, perpage = 3) => {

    try {

        const response = await axios.get(`master/business-units?page=${currentPage}&page_size=${perpage}`)
        return response.data

    } catch (e) {
        return e.response.data
    }

}
const getAllUnitBusinessCategory = async () => {

    try {

        const response = await axios.get('/master/business-units/categories')
        return response.data

    } catch (e) {
        return e.response.data
    }

}

const storeUnitBusiness = async (data) => {
    try {
        const response = await axios.post('master/business-units', data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

const updateUnitBusiness = async (data) => {

    try {
        // console.log(`${data.id}`)
        const response = await axios.put(`/master/business-units/${data.id}`, data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

const deleteUnitBusiness = async (id) => {

    try {

        const response = await axios.delete(`/master/business-units/${id}`)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

export { getAllUnitBusiness,getAllUnitBusinessCategory, storeUnitBusiness, updateUnitBusiness, deleteUnitBusiness }

