import { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx'; 
import { fetchProducts, setProductQuantity,} from '../service/service.js'; 
import '../styles/productList.css'

const loadingContent = (
    <div className="flex justify-center items-center p-8 bg-indigo-50 rounded-lg shadow-md max-w-sm mx-auto my-8">
        <div className="flex items-center space-x-3">
            <svg className="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            
            <p className="text-lg font-semibold text-indigo-800">
                Carregando dados...
            </p>
        </div>
    </div>
)

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
                        Nao foi possivel carregar o conteudo. Motivo: Falha na conexao com o servidor
                    </p>
                </div>
                
            </div>
        </div>
    </div>
)

const emptyListContent = (
    <div className="mt-8 p-8 text-center bg-green-600 border text-white rounded-lg mx-auto max-w-lg mt-10">
        <h2 className="text-2xl font-bold mb-3">Nenhum Produto Encontrado</h2>
        <p>O catalogo esta vazio, infelizmente nao temos produtos disponiveis</p>
    </div>
)

const addLoadingContet = (
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
                        Adicionando ao Carrinho...
                    </h2>
                    <p className="text-sm text-gray-500">
                        Aguarde a confirmação.
                    </p>
                </div>
            </div>
        </div>
    </div>
)

const getSuccessContent = (onClose) => (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
    >
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full">
            <div className="flex flex-col items-center">
                
                <svg className="h-10 w-10 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Produto Adicionado!
                </h2>
                <p className="text-base text-gray-600 mb-4 text-center">
                    Seu item foi adicionado ao carrinho com sucesso.
                </p>
                
                <button 
                    onClick={onClose}
                    className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150"
                >
                    Fechar
                </button>
            </div>
        </div>
    </div>
);

export default function ProductList() {

    const [products,setProducts] = useState([]);
    const [productsInCart, setProductsInCart] = useState(JSON.parse(localStorage.getItem("carrinho")) || {})

    const [isLoading, setIsLoading] = useState(true);
    const [isAddLoading, setIsAddLoading] = useState(false)

    const [error, setError] = useState(null);
    const [addError, setAddError] = useState(null)

    const [isTimeDelayed, setIsTimeDelayed] = useState(false); 
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); 


    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(productsInCart))
    }, [productsInCart])

    const loadProducts = async () => {
        setIsLoading(true)
        try {
            const productsData = await fetchProducts(); 
            setProducts(productsData);
        } catch (err) {
            setError("Não foi possível carregar os produtos. Verifique a conexão com o servidor.");
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadProducts();
    }, [])

    async function addToCart(product){
        setIsAddLoading(true)
        setAddError(false)
        setShowSuccessMessage(false); 
        setIsTimeDelayed(false); 

        const productId = product.id.toString();

        const timerPromise = new Promise(resolve => {
            setTimeout(() => {
                setIsTimeDelayed(true);
                resolve();
            }, 500); 
        });

        try{
            let newCart;

            if(productsInCart[productId]){
                const updateProduct= {
                    "produto": { ...product, quantidade: product.quantidade - 1 }, 
                    "quantidadeNoCarrinho": productsInCart[productId]["quantidadeNoCarrinho"] + 1
                }
                newCart = {...productsInCart}
                newCart[productId] = updateProduct
            }
            else{
                const updateProduct = {
                    "produto": { ...product, quantidade:  product.quantidade - 1}, 
                    "quantidadeNoCarrinho": 1
                }
                newCart  = {...productsInCart}
                newCart[productId] = updateProduct
            }
            
            setProductsInCart(newCart)
            
            setProducts(prevProdutos =>
                prevProdutos.map(p =>
                    p.id === product.id 
                        ? { ...p, quantidade: p.quantidade - 1 } 
                        : p
                )
            );

            await setProductQuantity(product.id, product.quantidade - 1)

        }
        catch (erro){
            setAddError(true)
            console.error(erro)
        }
        finally{
            await timerPromise; 
            setIsAddLoading(false);
            
            if (!addError) {
                setShowSuccessMessage(true);
            }
        }
    }

    if(isLoading) return loadingContent
    if(error) return  errorContent
    if(products.length === 0) return emptyListContent

    return (
        <div className="rounded-xl mt-8 w-full p-4 sm:p-6 lg:p-8 bg-[var(--cor-do-fundo)]">
            <h1 className="text-green-500 text-4xl font-extrabold text-gray-900 mb-10 text-center pb-4">
                Catalogo de Produtos
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
                
                {products.map((product) => (
                    <ProductCard
                        key={product.id} 
                        product={product} 
                        desabilitar={isAddLoading} 
                        addToCart={() => addToCart(product)}/>
                ))}

            </div>

            {/* Renderiza o overlay de loading enquanto estiver carregando */}
            {isAddLoading && addLoadingContet} 

            {/* Renderiza a mensagem de sucesso, que pode ser fechada */}
            {showSuccessMessage && 
                getSuccessContent(() => setShowSuccessMessage(false))
            }

        </div>
    );
}