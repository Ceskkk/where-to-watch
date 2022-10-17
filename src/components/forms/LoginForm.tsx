import { useRouter } from "next/router"
import { ChangeEvent, FocusEvent, FormEvent, useState } from "react"

import { IFormFields } from "../../types"
import { signIn } from "../../services/auth"

export default function LoginForm() {
  const router = useRouter()

  const [fields, setFields] = useState<IFormFields>({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState<IFormFields>({
    email: "",
    password: ""
  })

  const [submitError, setSubmitError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const haveErrors = (): boolean => {
    if (errors.email !== "" || errors.password !== "") {
      return true
    }
    return false
  }

  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    validateField(e)
  }

  const validateField = (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => {
    let { name, value } = e.target
    let error: string = ""

    switch (name) {
      case "email":
        if (!value) {
          error = "Please enter Email."
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid."
        }
        break

      case "password":
        if (!value) {
          error = "Please enter Password."
        }
        break

      default:
        break
    }

    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!haveErrors()) {
      await signIn(fields).then((res) => {
        if (typeof res === "string") {
          setSubmitError(res)
        } else {
          router.push("/")
        }
      })
    } else {
      setSubmitError("All fields must be filled correctly")
    }

    setLoading(false)
  }

  return (
    <section>
      <form onSubmit={(e) => loginUser(e)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={fields.email}
          onChange={(e) => onFieldChange(e)}
          onBlur={(e) => validateField(e)}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          minLength={6}
          value={fields.password}
          onChange={(e) => onFieldChange(e)}
          onBlur={(e) => validateField(e)}
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <button type="submit">Login</button>
        {submitError && <span className="error">{submitError}</span>}
        {loading && <span>Logging in ...</span>}
      </form>
    </section>
  )
}
