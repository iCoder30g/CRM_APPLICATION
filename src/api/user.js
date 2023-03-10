import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL


export async function getAllUser(userId) {
    return await axios.get(`${BASE_URL}/crm/api/v1/users/${userId}`, {
        headers: {
            'x-access-token': localStorage.getItem("accessToken")
        }
    })
}

export async function updateUserData(userId, data) {
    return await axios.put(`${BASE_URL}/crm/api/v1/users/${userId}`, data, {
        headers: {
            'x-access-token': localStorage.getItem("accessToken")
        }
    }, 
    {
        "userId": localStorage.getItem("userId")
    })

}