import { useForm } from 'react-hook-form'
import useCreateUser from '../hooks/useCreateUser'

export default function SignUpForm(props) {
  const { register, errors, handleSubmit } = useForm()
  const [createUser, { error, loading, success }] = useCreateUser()

  const onSubmit = (data) => {
    createUser(data)
  }

  if (loading) {
    return <div>loading....</div>
  }

  if (success) {
    return <div>User created. Login on /login</div>
  }

  return (
    <div>
      {error}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>Name</label>
        <div>
          <input
            id='name'
            type='text'
            name='name'
            ref={register({
              required: 'Please enter an name',
            })}
          />
          {errors.password && <div>{errors.password.message}</div>}
        </div>
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
            <button type='submit'>Sign up</button>
          </span>
        </div>
      </form>
    </div>
  )
}
