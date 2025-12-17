import LoginForm from '../components/LoginForm.jsx'

/** The contet of the login page
 * @module Pages:LoginPage
 * @component 
 * @param {function} setIsUserLoggedIn - A function that modifies the state of isUserLoggedIn
 * @param {function} setUserData - A function that modifies the state of user's data
 * @returns {JSX.element}
 */
export default function LoginPage({setIsUserLoggedIn,setUserData}){
    return(
        <>
            <section className="flex justify-center align-content">
                <LoginForm setIsUserLoggedIn={setIsUserLoggedIn} setUserData={setUserData}/>
            </section>
        </>
    )
}