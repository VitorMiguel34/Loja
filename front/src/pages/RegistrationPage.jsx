import RegistrationForm from '../components/RegistrationForm.jsx'

/** The content of the registraion page
 * @module Pages:RegistrationPage
 * @component
 * @returns {JSX.element}
 */
export default function RegistrationPage() {
  return (
    <>
      <section className="flex justify-center align-content">
        <RegistrationForm/>
      </section>
    </>
  )
}

