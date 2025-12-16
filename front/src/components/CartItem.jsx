export default function CartItem({ purchase, purchaseCount, removeOfCart, desabilitar}) {

    const purchaseName = purchase.produto.nome
    const purchasePrice = purchase.produto.preco

    return (
        <div className="flex items-center justify-between py-3 px-4 bg-white border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50">

            <div className="flex items-center space-x-3">
                
                <span className="h-2 w-2 bg-indigo-500 rounded-full flex-shrink-0"></span>

                <span className="text-lg font-medium text-gray-800 tracking-wide">
                    {purchaseCount} {purchaseName} - R${purchasePrice}
                </span>
            </div>

            <button 
                disabled={desabilitar}
                onClick={removeOfCart} 
                type="button"
                className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition duration-300 transform hover:scale-105"
            >
                Remover 
            </button>
            
        </div>
    );
}