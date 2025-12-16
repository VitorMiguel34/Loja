import axios from 'axios'

const USERS_API_URL  = 'http://localhost:8000/api/usuarios/'
const PRODUCTS_API_URL= 'http://localhost:8000/api/produtos/'

export const fetchUsers = async () => {
    try{
        const response = await axios.get(USERS_API_URL)
        return response.data
    }
    catch (error){
        throw error
    }
}

export const fetchUnicUser = async (userId) => {
    try{
        const users = await fetchUsers()
        const user = users.find(u => u.id === userId)
        return user
    }
    catch(error){
        throw error
    }
}

export const postUser = async (user) => {
    try{
        const response = await axios.post(USERS_API_URL, user)
        return response.data
    }
    catch (erro){
        throw erro
    }
}

export const fetchProducts = async () => {
    try{
        const response = await axios.get(PRODUCTS_API_URL)
        return response.data
    }
    catch(erro){
        throw erro
    }
}

export const setProductQuantity = async (productId, newQuantity) => {
    try{
        await axios.patch(`${PRODUCTS_API_URL}${productId}/`, {quantidade: newQuantity})
    }   
    catch(error){
        throw error
    }

}

export const setUserCredits = async (userId, newCreditsQuantity) => {
    try{
        await axios.patch(`${USERS_API_URL}${userId}/`, {creditos: newCreditsQuantity} )
    }
    catch (error){
        throw error
    }
}