/** CartItem props
 * @typedef CartItemProps 
 * @property {object} purchase - The current purchase item, containing the product details and the quantity in the cart.
 * @property {function} removeOfCart - A callback function executed when the user clicks 'Remove'. Removes a single instance of the product.
 * @property {boolean} disable - If true, the button is disabled and cannot be clicked.
 */ 

/**
 * @module Components:CartItem
 * @component 
 * @param {CartItemProps} props - CartItem's props
 * @returns {JSX.Element}
 */
export default function CartItem({ purchase, removeOfCart, disable}) {

    const productName = purchase.product.name
    const productPrice = purchase.product.price
    const productNumInCart = purchase.numInCart

    return (
        <div className="flex items-center justify-between py-3 px-4 bg-white border-b border-gray-100 last:border-b-0 transition-colors hover:bg-gray-50">

            <div className="flex items-center space-x-3">
                
                <span className="h-2 w-2 bg-indigo-500 rounded-full flex-shrink-0"></span>

                <span className="text-lg font-medium text-gray-800 tracking-wide">
                    {productNumInCart} {productName} - R${productPrice}
                </span>
            </div>

            <button 
                disabled={disable}
                onClick={removeOfCart} 
                type="button"
                className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition duration-300 transform hover:scale-105"
            >
                Remover 
            </button>
            
        </div>
    );
}