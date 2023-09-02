import axios from "axios"

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/auth/${url}`, {
        headers: { token: `Bearer ${token}` }
    })
    return res
}

export const postDataAPI = async (url, post) => {
    const res = await axios.post(`/auth/${url}`, post)
    return res
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`/auth/${url}`, post, {
        headers: { token: `Bearer ${token}` }
    })
    return res
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`/auth/${url}`, post, {
        headers: { token: `Bearer ${token}` }
    })
    return res
}

export const DeleteDataAPI = async (url, token) => {
    const res = await axios.delete(`/auth/${url}`, {
        headers: { token: `Bearer ${token}` }
    })
    return res
}