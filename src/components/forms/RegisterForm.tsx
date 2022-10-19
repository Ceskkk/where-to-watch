import { ChangeEvent, FocusEvent, FormEvent, useState } from "react"
import { useRouter } from "next/router"

import { IRegisterFormFields } from "../../types"
import { createAccount } from "../../services/auth"

export default function RegisterForm() {
  const router = useRouter()

  const [fields, setFields] = useState<IRegisterFormFields>({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState<IRegisterFormFields>({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [submitError, setSubmitError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const haveErrors = (): boolean => {
    if (
      errors.email !== "" ||
      errors.password !== "" ||
      errors.confirmPassword !== ""
    ) {
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
        } else if (fields.confirmPassword && value !== fields.confirmPassword) {
          name = "confirmPassword"
          error = "Password and Confirm Password does not match."
        } else if (fields.confirmPassword && value === fields.confirmPassword) {
          name = "confirmPassword"
        }
        break

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your Password."
        } else if (fields.password && value !== fields.password) {
          error = "Password and Confirm Password does not match."
        }
        break

      default:
        break
    }

    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!haveErrors()) {
      await createAccount(fields).then((res) => {
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
      <form onSubmit={(e) => registerUser(e)}>
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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          minLength={6}
          value={fields.confirmPassword}
          onChange={(e) => onFieldChange(e)}
          onBlur={(e) => validateField(e)}
          required
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}

        <button type="submit">Create account</button>
        {submitError && <span className="error">{submitError}</span>}
        {loading && <span>Creating account ...</span>}
      </form>
    </section>
  )
}
