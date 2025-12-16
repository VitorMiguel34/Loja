import { fetchUsers } from "./service.js"

export default class ValidateRegistration{

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

    static age(idadeUsuario){
        if(idadeUsuario < 0){
            alert("Idade negativa não é válida!")
            return false
        }
        return true
    }

    static async all(user){

        if(!this.name(user.nome)){
            return false
        }

        else if(!await this.email(user.email)){ 
            return false
        }

        else if(!this.age(user.idada)){
            return false
        }
        
        return true
    }
}