import axios from "axios";

export const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APIURL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_APITOKEN}`
    },
    timeout: 10000
});