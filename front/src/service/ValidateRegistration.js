import { fetchUsers } from "./service.js"

/**
 * @module ValidateRegistration
 * @description Static class providing validation methods for user registration data.
 */

export default class ValidateRegistration{

    /**
     * 
     * @param {string} usernaname - The user's full name to be processed
     * @returns {boolean} - True if the user's name is valid, false otherwise
     */
    static name(username){
        const NAME_REGEX = /^[A-Za-z\sÀ-ÖØ-öø-ÿ]+$/; 

        if (!username || username.trim().length < 2) {
            alert("O nome é obrigatório e deve ter pelo menos 2 letras!");
            return false;
        }

        if(!NAME_REGEX.test(username.trim())){
            alert("O nome deve ter apenas letras e espaços (sem números ou caracteres especiais)!");
            return false
        }
        
        return true
    }

    /**
     * 
     * @param {string} userEmail - The user's email to be processed
     * @returns {Promise<boolean>} - True if the email is valid and not registered, false otherwise.
     */
    static async email(userEmail){

        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!EMAIL_REGEX.test(userEmail)){
            alert("Email inválido!")
            return false
        }

        const users = await fetchUsers()
        const usersEmails = users.map(u => u.email)

        if(usersEmails.includes(userEmail)){
            alert("Já existe uma conta registrada com esse email!")
            return false
        }

        return true
    }

    /**
     * 
     * @param {number} userAge - The user's age to be processed
     * @returns {boolean} - True if the user's name is valid, false otherwise
     */
    static age(userAge){
        if(parseInt(userAge) != userAge){
            alert("A idade deve ser um numero inteiro!")
            return false
        }
        if(userAge < 0){
            alert("Idade negativa não é válida!")
            return false
        }
        return true
    }

    /**
     * 
     * @param {object} userData - User's data to be processed
     * @returns {Promise<boolean>} - True if the user's data is valid and not registered, false otherwise.
     */
    static async all(userData){

        if(!this.name(userData.name)){
            return false
        }

        else if(!await this.email(userData.email)){ 
            return false
        }

        else if(!this.age(userData.age)){
            return false
        }
        
        return true
    }
}