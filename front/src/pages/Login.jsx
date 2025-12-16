import LoginForm from '../components/LoginForm.jsx'

export default function Login({login,setUserData}){
    return(
        <>
            <section className="flex justify-center align-content">
                <LoginForm login={login} setUserData={setUserData}/>
            </section>
        </>
    )
}