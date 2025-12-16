import LoginForm from '../components/LoginForm.jsx'

export default function Login({logar,setUserData}){
    return(
        <>
            <section className="flex justify-center align-content">
                <LoginForm logar={logar} setUserData={setUserData}/>
            </section>
        </>
    )
}