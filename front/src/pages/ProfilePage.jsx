import { useNavigate } from 'react-router-dom';

/** The content of the user's profile page
 * @module Pages:ProfilePage
 * @component
 * @param {function} setIsUserLoggedIn - A function that modifies the state of isUserLoggedIn
 * @param {object} userData - The user's data(if user is logged in)
 * @param {function} setUserData - A function that modifies the userData
 * @param {JSX.Element} loadingUserContent - The contet to be shownd while loading user
 */
export default function ProfilePage({setIsUserLoggedIn, userData, setUserData, loadingUserContent}){
  const navigate = useNavigate()

  function exitSession(){
      localStorage.clear()
      setIsUserLoggedIn(false)
      setUserData(null)
      navigate('/') 
  }

  if(!userData) return loadingUserContent

  return (
    <div className="mx-auto my-8 max-w-lg rounded-xl bg-white p-6 shadow-2xl border border-gray-100">
      
      <h2 className="text-2xl font-bold text-gray-800 text-center pb-4 mb-4 border-b-2 border-indigo-500">
        Perfil do Usuário
      </h2>
       
        <div className="space-y-3 flex-col justify-center items-center">
          
          <p className="text-gray-700"><strong className="font-semibold text-gray-900">Nome:</strong> {userData.name}</p>
          <p className="text-gray-700"><strong className="font-semibold text-gray-900">E-mail:</strong> {userData.email}</p>
          <p className="text-gray-700"><strong className="font-semibold text-gray-900">Saldo: R$</strong> {userData.balance}</p>


          <button onClick={exitSession} type="button" className="text-white w-[470px] py-2 font-semibold rounded-lg bg-red-500 hover:bg-red-600 hover:scale-105 transition duration-300">
              Sair
          </button>
        </div>
      
    </div>
  );
};


