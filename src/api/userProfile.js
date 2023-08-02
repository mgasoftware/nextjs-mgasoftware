import axios from "axios";

const userProfileURL = "http://127.0.0.1:8000/api/v1/user/profile";

export const userProfile = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let token = sessionStorage.getItem("token");

            if (!token) {
                token = localStorage.getItem("token");
                if (!token) reject("Token not found!");
            }

            const res = await axios.post(userProfileURL, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}