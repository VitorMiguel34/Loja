import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {useEffect, useState} from 'react'
import AOS from 'aos'
import PrivateRout from './components/PrivateRoute.jsx';
import CadastroPage from './pages/Cadastro.jsx';
import LoginPage from './pages/Login.jsx'
import HomePage from './pages/Home.jsx'
import CarrinhoPage from './pages/Cart.jsx'
import UserPage from './pages/User.jsx'
import Header from './components/Header.jsx'
import {fetchUnicUser} from './service/service.js'
import './App.css'
import 'aos/dist/aos.css'

const loadingUserContent = (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm"
        role="status"
        aria-live="polite"
    >
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full transform transition duration-300 scale-100">
            
            <div className="flex items-center space-x-4">
                
                <svg 
                    className="animate-spin h-8 w-8 text-indigo-600" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                >
                    <circle 
                        className="opacity-25" 
                        cx="12" cy="12" r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                    ></circle>
                    <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>

                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        Carregando dados do usuario...
                    </h2>
                    <p className="text-sm text-gray-500">
                        Aguarde a confirmação.
                    </p>
                </div>
            </div>
        </div>
    </div>
)

export default function App() {

    const initialUserId = parseInt(localStorage.getItem("userId")) || null;
    const [usuarioLogado, setUsuarioLogado] = useState(false); 
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const loggedIn = localStorage.getItem("usuarioLogado") === "true";
            setUsuarioLogado(loggedIn);

            if (loggedIn && initialUserId) {
                const initialUserData = await fetchUnicUser(initialUserId);
                setUserData(initialUserData); 
            }
        };

        fetchUser();
        
        AOS.init(); 
        
    }, []);

    return (
        <BrowserRouter>
            <Header loggedInUser={usuarioLogado}/>
            <main>
                <Routes>

                    <Route path="/" element={<HomePage/>}/>

                    <Route path="/cadastro" element={<CadastroPage/>} />

                    <Route path="/login" element={<LoginPage setUserData={setUserData} logar={() => {setUsuarioLogado(true)}}/>} />

                    <Route path="/usuario" element={<PrivateRout/>}>
                        <Route path="/usuario/" element={<HomePage usuarioLogado={true} userData={userData} loadingUserContent={loadingUserContent}/>}/>
                        <Route path="/usuario/perfil" element={<UserPage userData={userData} loadingUserContent={loadingUserContent} setUserData={setUserData} setUsuarioLogado={setUsuarioLogado}/>}/>
                        <Route path="/usuario/carrinho" element={<CarrinhoPage userData={userData} loadingUserContent={loadingUserContent} setUserData={setUserData}/>}/>
                    </Route>

                </Routes>
            </main>
        </BrowserRouter>
    );
}