import axios from '../helper/axios'

const getAllUnitBusiness = async () => {

    try {

        const response = await axios.get('master/business-units?page=1&page_size=5')
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

const updateArmada = async (data) => {

    try {

        const response = await axios.put(`/masterdata/vehicle/${data.id}`, data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

const deletePengguna = async (id_user) => {

    try {

        const response = await axios.delete(`/master/users/:id_user`)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

export { getAllUnitBusiness,getAllUnitBusinessCategory, storeUnitBusiness, updateArmada, deletePengguna }

