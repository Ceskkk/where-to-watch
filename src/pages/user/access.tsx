import LoginForm from "../../components/forms/LoginForm"
import RegisterForm from "../../components/forms/RegisterForm"

import styles from "../../styles/Access.module.css"

export default function Access() {
  return (
    <div className={styles.access}>
      <div>
        <h1>Login</h1>
        <LoginForm />
      </div>
      <div>
        <h1>Create new account</h1>
        <RegisterForm />
      </div>
    </div>
  )
}
