import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {fetchUsers} from '../service/service.js'
import '../styles/form.css'

export default function LoginForm({logar, setUserData}){
    const navigate = useNavigate()

    const [userInfos, setUserInfos] = useState({email: '', senha: ''})
    const [error, setError] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    async function loginUser(e){
        e.preventDefault()
        setError(false)
        setSucess(false)
        try{
            const users = await fetchUsers()
            const user = users.find(u => u.email === userInfos.email && u.senha === userInfos.senha)
            
            if(user){
                localStorage.setItem("userId", user.id)
                setSucess(true)
                localStorage.setItem("usuarioLogado", true)
                setUserData(user)
                logar()
                navigate("/usuario/")
            }
            else{
                setError(true)
                setErrorMessage("Credenciais invalidas!")
            }
            setUserInfos({email: '', senha: ''})
        }
        catch (erro){
            setError(true)
            setErrorMessage("Falha na conexao com o servidor!")
        }
    }
    
    function handleChange(e){
        setUserInfos({
            ...userInfos,
            [e.target.name]: e.target.value
        })
    }


    return( 
        <div className="flex justify-center"> 
            <form data-aos="fade-down" data-aos-duration="600"
                onSubmit={loginUser} 
                className="flex flex-col items-center p-16 bg-[var(--cor-do-form)] rounded-xl mt-4" 
                style={{width: '400px'}}> 
                
                {error? <div className="mb-4 w-64 px-4 mb-10"> 
                    <div 
                        className="p-3 text-left bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md"
                        role="alert"
                    >
                        <div className="flex items-center">
                            
                            <svg className="w-5 h-5 mr-2 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                            </svg>

                            <div>
                                <h4 className="text-sm font-bold text-red-800">
                                    Falha no Login
                                </h4>
                                <p className="text-xs">
                                    {errorMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>: null}

                <h1 className="text-3xl text-[var(--cor-do-titulo)]">Login</h1>
                <input 
                    onChange={handleChange} 
                    value={userInfos.email} 
                    className="rounded-md m-4 px-4 w-11/12 py-2 focus:outline-none"
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    autoComplete='off' 
                    required
                />

                <input 
                    onChange={handleChange} 
                    value={userInfos.senha} 
                    className="rounded-md m-4 px-4 w-11/12 py-2 focus:outline-none"
                    type="password" 
                    name="senha" 
                    placeholder='Senha' 
                    autoComplete='off' 
                    required
                />
                
                <button type="submit" className="mt-6 w-11/12 px-4 py-2 text-white bg-[var(--cor-do-botao-de-submit)] hover:bg-[var(--cor-do-botao-de-submit-hover)] rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-105">
                    Fazer login
                </button>
                
            </form>
        </div>
    )
}