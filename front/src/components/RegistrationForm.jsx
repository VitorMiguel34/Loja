import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {postUser} from '../service/service.js'
import RegistrationValidate from '../service/ValidateRegistration.js'
import '../styles/form.css'

export default function RegistrationForm(){

    const navigate = useNavigate()

    const INITIAL_BALANCE= 300

    const [userData, setUserData] = useState({name: '', email: '', age: '', password: '', balance: INITIAL_BALANCE})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const registerUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(false)

        setUserData({
            ...userData,
            age: parseInt(userData.age)
        })

        try{
            const validRegistration = await RegistrationValidate.all(userData)

            if(validRegistration){
                await postUser(userData)
                setUserData({name: '', email: '', age: '', password: '', balance: INITIAL_BALANCE})
                navigate('/login')
            }
        }
        catch (erro){
            console.log(erro)
            setError(true)
            alert("Erro!")
        }
        finally{
            setLoading(false)
        }
    }

    function handleChange(e){
        setUserData({
            ...userData,
            [e.target.name]: e.target.name === "name" ? e.target.value : e.target.value.trim()
        })
    }
    const errorContent = (
        <div className="flex justify-center my-8">
            <div className="p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-lg max-w-md w-full" role="alert">
                
                <div className="flex items-start">
                    
                    <svg className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                    </svg>

                    <div>
                        <h3 className="text-xl font-bold text-red-800 mb-1">
                            Ops! Ocorreu um erro.
                        </h3>
                        <p className="text-base">
                            Nao foi possivel realizar o cadastro
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    )

    if(error) return errorContent
    
    return (
        <div className="flex justify-center" style={{height: '500px'}}> 
            <form data-aos="fade-down" data-aos-duration="600"
                onSubmit={registerUser} 
                className="flex flex-col items-center p-16 bg-[var(--cor-do-form)] rounded-xl mt-4" 
                style={{width: '400px'}}
            > 
            
                <h1 className="text-3xl text-[var(--cor-do-titulo)]">Cadastro</h1>
                <input 
                    onChange={handleChange} 
                    value={userData.name} 
                    className="rounded-md m-4 px-4 w-11/12 py-2 focus:outline-none"
                    type="text" 
                    name="name" 
                    placeholder='Nome' 
                    autoComplete='off' 
                    required
                />
                
                <input 
                    onChange={handleChange} 
                    value={userData.email} 
                    className="rounded-md m-4 px-4 w-11/12 py-2 focus:outline-none"
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    autoComplete='off' 
                    required
                />
                
                <input 
                    onChange={handleChange} 
                    value={userData.age} 
                    className="rounded-md m-4 px-4 w-11/12 py-2 focus:outline-none"
                    type="number" 
                    name="age" 
                    placeholder='Idade' 
                    autoComplete='off' 
                    required
                />

                <input 
                    onChange={handleChange} 
                    value={userData.password} 
                    className="rounded-md m-4 px-4 w-11/12 py-2 focus:outline-none"
                    type="password" 
                    name="password" 
                    placeholder='Senha' 
                    autoComplete='off' 
                    required
                />
                
                <button disabled={loading} type="submit" className="mt-6 w-11/12 px-4 py-2 text-white text-white bg-[var(--cor-do-botao-de-submit)] hover:bg-[var(--cor-do-botao-de-submit-hover)] rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-105">
                    Cadastrar
                </button>
                
            </form>
        </div>
    )
}