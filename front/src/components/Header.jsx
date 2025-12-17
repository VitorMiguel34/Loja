import { Link } from "react-router-dom"
import { 
    HomeIcon, 
    ShoppingCartIcon, 
    UserIcon, 
    UserPlusIcon, 
    ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/solid'  

/**
 * The page's header
 * @module Components:Header
 * @component
 * @param {boolean} isUserLoggedIn - Indicates if user is logged in
 */
export default function Header({isUserLoggedIn}){

    const iconStyle = "w-5 h-5 mr-1"

    return(
        <header className="bg-[var(--cor-da-navbar)] shadow-lg sticky top-0 z-10" >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center text-[var(--cor-do-texto)]">
                <div className="flex items-center">

                   <Link to={isUserLoggedIn? "/usuario/": "/"} className="text-2xl font-extrabold transition duration-300 hover:scale-105 hover:text-green-500 flex items-center">
                            <HomeIcon className="w-6 h-6 mr-2" />
                            Home
                    </Link>
                </div>

                <div className="flex space-x-6">
                    {isUserLoggedIn?<>
                    <Link 
                        to="/usuario/carrinho" 
                        className="text-white px-3 py-2 text-sm font-semibold rounded-lg bg-[var(--cor-do-botao)] hover:bg-[var(--cor-do-botao-hover)] transition duration-300 shadow-md hover:scale-105 flex items-center" 
                    >
                        <ShoppingCartIcon className={iconStyle}/>
                        Carrinho de compras
                    </Link>
    
                    <Link to="/usuario/perfil" className="text-white px-3 py-2 text-sm font-semibold rounded-lg bg-[var(--cor-do-botao)] hover:bg-[var(--cor-do-botao-hover)] transition duration-300 shadow-md hover:scale-105 flex items-center">
                        <UserIcon className={iconStyle} />
                        Perfil
                    </Link></>:
                    <>

                    <Link to="/cadastro" className="text-white px-3 py-2 text-sm font-semibold rounded-lg bg-[var(--cor-do-botao)] hover:bg-[var(--cor-do-botao-hover)] transition duration-300 shadow-md hover:scale-105 flex items-center">
                        <UserPlusIcon className={iconStyle} />
                        Cadastrar
                    </Link>
                    
                    <Link to="/login" className="text-white px-3 py-2 text-sm font-semibold rounded-lg bg-[var(--cor-do-botao)] hover:bg-[var(--cor-do-botao-hover)] transition duration-300 shadow-md hover:scale-105 flex items-center" >
                        <ArrowRightOnRectangleIcon className={iconStyle} />
                        Login
                    </Link></>}
                </div>
            </nav>
        </header>
    )
}