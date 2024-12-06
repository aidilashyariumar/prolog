import axios from '../helper/axios'

const getAllPengguna = async (currentPage = 1, perpage = 3) => {

    try {

        const response = await axios.get(`master/users?page=${currentPage}&page_size=${perpage}`)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

const storePengguna = async (data) => {
    try {
        const response = await axios.post('/master/users', data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

const updatePengguna = async (data) => {

    try {

        const response = await axios.put(`/master/users/${data.id}`, data)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

const deletePengguna = async (id) => {

    try {

        const response = await axios.delete(`/master/users/${id}`)
        return response.data

    } catch (e) {
        return e.response.data
    }

}

export { getAllPengguna, storePengguna, updatePengguna, deletePengguna }

