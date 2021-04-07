import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import useLoginUser from '../hooks/useLoginUser'
import { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'

export default function LoginForm(props) {
  const { register, errors, handleSubmit } = useForm()
  const [login, { loading, error }] = useLoginUser()
  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    // Already logged in
    if (user) {
      router.replace('/dashboard')
    }
  }, [])

  const onSubmit = (data) => {
    login(data).then(() => {
      router.replace('/dashboard')
    })
  }

  return (
    <div>
      {error}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email'>Email address</label>
          <div>
            <input
              id='email'
              type='email'
              name='email'
              ref={register({
                required: 'Please enter an email',
                pattern: {
                  value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                  message: 'Not a valid email',
                },
              })}
            />
            {errors.email && <div>{errors.email.message}</div>}
          </div>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <div>
            <input
              id='password'
              type='password'
              name='password'
              ref={register({
                required: 'Please enter a password',
                minLength: {
                  value: 6,
                  message: 'Should have at least 6 characters',
                },
              })}
            />
            {errors.password && <div>{errors.password.message}</div>}
          </div>
        </div>
        <div>
          <span>
            <button disabled={loading} type='submit'>
              Log in
            </button>
          </span>
        </div>
      </form>
    </div>
  )
}
