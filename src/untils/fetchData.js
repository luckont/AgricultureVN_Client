import axios from "axios"

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/auth/${url}`, {
        headers: { token: `Bearer ${token}` }
    })
    return res
}

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`/auth/${url}`, post, {
        headers: { token: `Bearer ${token}` }
    })
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

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`/auth/${url}`, {
        headers: { token: `Bearer ${token}` }
    })
    return res
}

export const getDataAPIUser = async(url, token) => {
    const res = await axios.get(`/user/${url}`, {
        headers: { token: `Bearer ${token}` }
    })
    return res
}
export const putDataAPIUser = async(url, post, token) => {
    const res = await axios.put(`/user/${url}`, post, {
        headers: { token: `Bearer ${token}` }
    })
    return res
}