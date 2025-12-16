import { useEffect, useState } from "react";

export default function ProductCard({ product, addToCart, disable }) {

    const imageUrl = product.image;
    const [productCount, setProductCount] = useState(product.quantity)

    useEffect(() => {
        setProductCount(product.quantity);
    }, [product.quantity]);

    const isAvailable = productCount > 0;
    const isDisabled = disable || !isAvailable;

    return (
        <div className="max-w-xs mx-auto rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white transform hover:scale-[1.02] my-8">

            <div className="h-64 w-full overflow-hidden">
                <img
                    className="h-full w-full object-cover transition-transform duration-300"
                    src={imageUrl}
                    alt={`Imagem de ${product.name}`}
                />
            </div>

            <div className="p-5">
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 truncate">
                    {product.name}
                </h3>

                <div className="flex justify-between items-center mb-4 border-t pt-3 border-gray-100">
                    <div className="text-left">
                        <span className="text-sm font-medium text-gray-500 block">Preço:</span>
                        <h4 className="text-2xl font-bold text-indigo-600">
                            R${product.price.toFixed(2)}
                        </h4>
                    </div>

                    <div className="text-right">
                        <span className="text-sm font-medium text-gray-500 block">Unidades:</span>
                        {isAvailable ? (
                            <h5 className="text-xl font-bold text-green-600">
                                {productCount}
                            </h5>
                        ) : (
                            <h5 className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-red-100 text-red-700 rounded-full">
                                Indisponível!
                            </h5>
                        )}
                    </div>
                </div>

                <button
                    disabled={isDisabled}
                    className={`w-full text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:scale-105
                        ${isDisabled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-75'
                        }`}
                    onClick={() => {
                        if (isAvailable) {
                            addToCart();
                            setProductCount(prevCount => prevCount - 1);
                        }
                        else {
                            alert("Não temos mais unidades desse produto disponíveis!");
                        }
                    }}
                >
                    {isDisabled && disable ? 'Aguarde...' : 'Adicionar ao Carrinho'}
                </button>
            </div>
        </div>
    );
}