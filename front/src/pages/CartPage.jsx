import {useEffect, useState} from 'react'
import CartItem from "../components/CartItem.jsx"
import {setProductQuantity, setUserBalance} from '../service/service.js'

const removeLoadingContent = (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm"
        role="status"
        aria-live="polite"
    >
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full transform transition duration-300 scale-100">
            <div className="flex items-center space-x-4">
                <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Removendo do carrinho...</h2>
                    <p className="text-sm text-gray-500">Aguarde a confirmação.</p>
                </div>
            </div>
        </div>
    </div>
)

const getRemoveSuccessContent = (onClose) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm" role="dialog" aria-modal="true">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full">
            <div className="flex flex-col items-center">
                <svg className="h-10 w-10 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Produto Removido!</h2>
                <p className="text-base text-gray-600 mb-4 text-center">A quantidade foi atualizada no carrinho.</p>
                <button onClick={onClose} className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150">
                    Fechar
                </button>
            </div>
        </div>
    </div>
);

const loadingFinishPurchaseContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm" role="status" aria-live="polite">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full transform transition duration-300 scale-100">
            <div className="flex items-center space-x-4">
                <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Finalizando compra...</h2>
                    <p className="text-sm text-gray-500">Aguarde a confirmação.</p>
                </div>
            </div>
        </div>
    </div>
)

const getFinishPurchaseContent = (onClose) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm" role="dialog" aria-modal="true">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full">
            <div className="flex flex-col items-center">
                <svg className="h-10 w-10 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Compra finalizada!</h2>
                <p className="text-base text-gray-600 mb-4 text-center">Sua compra foi concluída com sucesso!</p>
                <button onClick={onClose} className="mt-4 w-full px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-150">
                    Fechar
                </button>
            </div>
        </div>
    </div>
);

const emptyCardContent = (
    <div className="p-10 text-center bg-white rounded-xl shadow-lg mx-auto max-w-xl mt-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu Carrinho Está Vazio</h2>
        <p className="text-gray-500">Adicione alguns produtos para começar a comprar!</p>
    </div>
)

export default function CartPage({userData, setUserData, loadingUserContent}) {
    const [productsInCart, setProductsInCart] = useState(JSON.parse(localStorage.getItem("cart")) || {})
    const [totalPrice, setTotalPrice] = useState(0)
    const [numOfItems, setNumOfItems] = useState(0)
    const [isRemoveLoading, setIsRemoveLoading] = useState(false)
    const [isFinishPurchaseLoading, setIsFinishPurchaseLoading] = useState(false)
    const [removeError, setRemoveError] = useState(false)
    const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);
    const [showFinishPurchaseSucess, setShowFinishPurchaseSucess] = useState(false)

    async function removeOfCart(purchase){
        setIsRemoveLoading(true)
        setRemoveError(false)
        setShowRemoveSuccess(false); 
        
        let errorHappened = false;
        const timerPromise = new Promise(resolve => setTimeout(resolve, 500));

        try{
            const originalProduct = purchase.product;
            const productId = originalProduct.id.toString();
            const updateProduct = {
                product: {...originalProduct, quantity: originalProduct.quantity + 1},
                numInCart: purchase.numInCart - 1
            }
            let newCart = {...productsInCart}
            newCart[productId] = updateProduct
            await setProductQuantity(productId, updateProduct.product.quantity)
            if(updateProduct.numInCart === 0) delete newCart[productId]
            setProductsInCart(newCart)
            localStorage.setItem("cart",JSON.stringify(newCart)) 
        }
        catch(erro){
            setRemoveError(true)
            errorHappened = true;
        }
        finally{
            await timerPromise; 
            setIsRemoveLoading(false);
            if (!errorHappened) setShowRemoveSuccess(true);
        }
    }

    async function finishPurchase(){
        setIsFinishPurchaseLoading(true)
        try{
            const userBalance = userData.balance
            if(userBalance < totalPrice){
                alert("Você não tem créditos suficientes.")
            } else {
                await setUserBalance(userData.id, userBalance - totalPrice)
                setUserData({...userData, balance: userBalance - totalPrice})
                setProductsInCart({})
                localStorage.setItem("cart", JSON.stringify({}))
                setShowFinishPurchaseSucess(true)
            }
        }
        catch(erro){
            console.error(erro)
        }
        finally{
            setIsFinishPurchaseLoading(false)
        }
    }

    useEffect(() => {
        let price = 0
        let num = 0
        Object.keys(productsInCart).forEach(pId => {
            price += productsInCart[pId].product.price * productsInCart[pId].numInCart;
            num += productsInCart[pId].numInCart
        })
        setTotalPrice(price.toFixed(2))
        setNumOfItems(num)
    }, [productsInCart])

    const productIds = Object.keys(productsInCart) 

    if(!userData) return loadingUserContent
    if(removeError) alert("Erro ao remover produto!")

    // Lógica Unificada de Renderização
    if(productIds.length === 0 && !showFinishPurchaseSucess) return emptyCardContent

    return (
        <div className="max-w-3xl mx-auto p-8 mt-12 bg-green-500 rounded-xl shadow-2xl">
            {/* Modais de Finalização */}
            {isFinishPurchaseLoading && loadingFinishPurchaseContent}
            {showFinishPurchaseSucess && getFinishPurchaseContent(() => setShowFinishPurchaseSucess(false))}
            
            {/* Modais de Remoção */}
            {isRemoveLoading && removeLoadingContent}
            {showRemoveSuccess && getRemoveSuccessContent(() => setShowRemoveSuccess(false))}

            <h1 className="text-4xl font-extrabold text-white mb-8 border-indigo-200 pb-3">
                Meu Carrinho de Compras ({numOfItems} Itens)
            </h1>

            <div className="bg-white rounded-lg overflow-hidden">
                {productIds.map(id => (
                    <CartItem
                        key={id} 
                        purchase={productsInCart[id]} 
                        removeOfCart={() => removeOfCart(productsInCart[id])} 
                        disable={isRemoveLoading || isFinishPurchaseLoading}
                    /> 
                ))}
            </div>

            <div className="flex justify-between items-center mt-6 p-4 bg-green-200 rounded-lg">
                <span className="text-xl font-bold text-black">Total: R$ {totalPrice}</span>
                <button 
                    disabled={isRemoveLoading || isFinishPurchaseLoading || productIds.length === 0} 
                    onClick={finishPurchase} 
                    type="button" 
                    className="text-white px-4 py-2 font-semibold rounded-lg bg-green-700 hover:bg-green-800 transition duration-300 disabled:bg-gray-400"
                >
                    Finalizar compra
                </button>
            </div>
        </div>
    )
}