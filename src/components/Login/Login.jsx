import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import './Login.css'

function Login() {

  const [text, setText] = useState('')
  const [password, setPassword] = useState(0);
  const [feedbackForPassword, setfeedbackForPassword] = useState('')
  const passwordFeedback = useRef()
  let location = useNavigate()
  let url = process.env.REACT_APP_SERVER_IP
  let isMail = text.includes('@')

  function validate(e) {
    e.preventDefault()
    let form = new FormData(e.target)

    let valid = isMail && password >= 4
    if (valid) {
      console.log(`${url}/login`)
      fetch(`${url}/login`, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) }).then((res) => {
        return res.json()
      }).then(data => {
        if(data.status===200){
          
          alert("logIn success")
        }else if(data.status===204){
          alert("Account not exist")
          
        }
        else if(data.status===206){
          setfeedbackForPassword('Password is incorrect')
          passwordFeedback.current.classList.add('is-invalid')
          
        }
        console.log(data);
        location(data.url, { replace: true })

      })
    }
  }
  console.log(password)


  return (
    <div className='login bg-dark'>
      <span className='circle'></span>


      <div className='logForm'>

        <form onSubmit={validate}  className='form1' >
          <h1 className='h1'>Log In Form</h1>
          <div className="form-floating">
            <input value={text} onChange={(e) => {
              setText(e.target.value)
              switch (e.target.value.includes('@') && e.target.value.includes('.')) {
                case false:

                  e.target.classList.add('is-invalid')
                  e.target.classList.remove('is-valid')
                  break;

                default:
                  e.target.classList.remove('is-invalid')
                  e.target.classList.add('is-valid')
                  break;
              }
            }} className='label form-control' type="email" name="email" placeholder='Email' />
            <label htmlFor="email">Email</label>
            <div className='invalid-feedback'>
              Enter Valid E-Mail
            </div>
          </div>

          <div className="form-floating">
            <input className='label form-control' onChange={(e) => {
              setPassword(e.target.value.length)

              switch (e.target.value.length >= 4) {
                case false:
                  setfeedbackForPassword('At least 4 character needed')
                  e.target.classList.add('is-invalid')

                  e.target.classList.remove('is-valid')

                  break;

                default:
                  e.target.classList.remove('is-invalid')
                  e.target.classList.add('is-valid')
                  break;


              }

            }} name="password" ref={passwordFeedback} type="password" placeholder='Password' />
            <label htmlFor="email">Password</label>
            <div className="invalid-feedback">
              {feedbackForPassword}
            </div>
          </div>


          <hr />

          <button className='btn' type='submit'>Login</button>

          <p style={{ color: 'gray' }}> Don't have an account?  <Link to={'/signup'}><strong>SignUp Here</strong></Link> </p>
        </form>



      </div>

    </div>
  )
}

export default Login