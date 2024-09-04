import { User } from "@/types/User"
import axios from "axios"


const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const SECTOR = 2000


const getUser = async (page:number,busqueda?:string,estado?:string) => {
    const response = await axios.get(`${BASE_URL}/users?usuario=${busqueda}&_page=${page}&_per_page=10&sector=${SECTOR}&estado=${estado}`)
    return response.data
}

const postUser = async (data:User) => {
    const response = await axios.post(`${BASE_URL}/users`,{
        ...data,
        sector: SECTOR
    })
    return response.data
}

const updateUser = async (data:User) => {
    const response = await axios.patch(`${BASE_URL}/users/${data.id}`,{
        ...data,
        sector: SECTOR
    })
    return response.data
}

const deleteUser = async (id:string) => {
    const response = await axios.delete(`${BASE_URL}/users/${id}`)
    return response.data
}

export { getUser, postUser, updateUser, deleteUser }