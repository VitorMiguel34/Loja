import axios from 'axios'

const USERS_API_URL  = 'http://localhost:8000/api/users/'
const PRODUCTS_API_URL= 'http://localhost:8000/api/products/'

/**
 * @module services
 * @description Provides asynchronous utility functions for interacting with the Users and Products APIs.
 */

/**
 * @typedef {object} User
 * @property {number} id - The unique identifier of the user (often included by the API response).
 * @property {string} name - The user's full name.
 * @property {string} email - The user's email address.
 * @property {number} age - The user's age.
 * @property {number} balance - The user's account balance.
 * @property {string} password - The user's account password
 */ 

/**
 * @typedef {object} Product
 * @property {number} id - The unique identifier of the product.
 * @property {string} name - The product's name.
 * @property {number} price - The unit price.
 * @property {number} quantity - The available stock quantity.
 */

/**
 * Searches for the list of all users available in the database.
 * @function fetchUsers
 * @async
 * @returns {Promise<Array<User>>} A Promise that resolves with an array of User objects.
 * @throws {Error} If a network error or API connection failure occurs.
 * @example
 * // Example of usage:
 * const users = await fetchUsers();
 * console.log(users[0].name);
 */
export const fetchUsers = async () => {
    try{
        const response = await axios.get(USERS_API_URL)
        return response.data
    }
    catch (error){
        throw error
    }
}

/**
 * Searches for a single user by their ID by filtering the full user list.
 * @function fetchUnicUser
 * @async
 * @param {number} userId - The ID of the user to search for.
 * @returns {Promise<User|undefined>} A Promise that resolves with the User object if found, or undefined otherwise.
 * @throws {Error} If a network error or API connection failure occurs.
 * @example
 * //Example of usage:
 * const user = await fetchUnicUser(15);
 * if (user) console.log(`Found user: ${user.name}`);
 */
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

/**
 * Posts a new user object to the API to create a new user record.
 * @function postUser
 * @async
 * @param {User} user - The new user object data to be sent 
 * @returns {Promise<User>} A Promise that resolves with the created User object (including the new ID).
 * @throws {Error} If the API returns an error status code (e.g., 400 Bad Request).
 * @example
 * //Example of usage:
 * const newUser = { name: "Alice", email: "a@test.com", age: 30, balance: 100 };
 * const createdUser = await postUser(newUser);
 * console.log(`New user ID: ${createdUser.id}`);
 */
export const postUser = async (user) => {
    try{
        const response = await axios.post(USERS_API_URL, user)
        return response.data
    }
    catch (erro){
        throw erro
    }
}

/**
 * Fetches the list of all products from the products API endpoint.
 * @function fetchProducts
 * @async
 * @returns {Promise<Array<Product>>} A Promise that resolves with an array of Product objects.
 * @throws {Error} If a network error or API connection failure occurs.
 * @example
 * //Example of usage:
 * const products = await fetchProducts()
 * products.map(product => {console.log(product.name)})
 */
export const fetchProducts = async () => {
    try{
        const response = await axios.get(PRODUCTS_API_URL)
        return response.data
    }
    catch(erro){
        throw erro
    }
}

/**
 * Updates the stock quantity of a specific product via a PATCH request.
 * @function setProductQuantity
 * @async
 * @param {number} productId - The ID of the product to be updated.
 * @param {number} newQuantity - The new quantity value for the product stock.
 * @returns {Promise<void>} A Promise that resolves when the update is successful.
 * @throws {Error} If the API returns an error status code (e.g., product not found).
 */
export const setProductQuantity = async (productId, newQuantity) => {
    try{
        await axios.patch(`${PRODUCTS_API_URL}${productId}/`, {quantity: newQuantity})
    }   
    catch(error){
        throw error
    }

}

/**
 * Updates the balance of a specific user via a PATCH request.
 * @function setUserBalance
 * @async
 * @param {number} userId - The ID of the user whose balance will be updated.
 * @param {number} newBalance - The new balance value for the user.
 * @returns {Promise<void>} A Promise that resolves when the update is successful.
 * @throws {Error} If the API returns an error status code (e.g., user not found).
 */
export const setUserBalance = async (userId, newBalance) => {
    try{
        await axios.patch(`${USERS_API_URL}${userId}/`, {balance: newBalance} )
    }
    catch (error){
        throw error
    }
}