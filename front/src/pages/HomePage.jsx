import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList.jsx'

/**
 * @module Pages:HomePage
 * @component
 * @param {boolean} [isUserLoggedIn = false] - Indicates if user is logged in
 * @param {object} [userData = null] - The users'data(if user is loggedIn) 
 * @param {JSX.Element} [loadingUserContent = null] - The content to be shown while loading user
 * @returns {JSX.Element}
 */
export default function HomePage({isUserLoggedIn = false,userData = null, loadingUserContent = null}) {

    if(!userData && isUserLoggedIn) return loadingUserContent

    return (
        <div className=" flex flex-col items-center p-8 mt-16">
            
            <div className="text-center max-w-4xl" data-aos="fade-down" data-aos-duration="1200">
                
                <h1 className="text-6xl font-extrabold text-gray-900 mb-4 tracking-tight sm:text-7xl">
                    A Melhor Loja Pra <span className="text-green-600">Voce Comprar</span>
                </h1>

                <p className="text-xl text-gray-600 mb-10 mt-6 max-w-2xl mx-auto">
                    Melhor site da internet
                </p>
                
                {!isUserLoggedIn?
                    <div className="mt-8 flex justify-center space-x-4">
                        
                        <Link to="/cadastro" className="px-8 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 shadow-xl transform hover:scale-105">
                            Comecar Cadastro
                        </Link>
                        
                        <Link to="/login" className="px-8 py-3 text-lg font-medium text-green-600 bg-white border-2 border-green-600 rounded-lg hover:bg-green-100 transition duration-300 transform hover:scale-105">
                            Fazer login
                        </Link>
                    </div>: null
                }
            </div>
            {isUserLoggedIn? 
            <div className="w-full mt-16" data-aos="fade-down" data-aos-duration="1200">
                <ProductList/>
            </div>: null
            }
        </div>
    );
}