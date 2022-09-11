import React from 'react'
import './Adminlogin.css'

function Adminlogin() {
  return (
    <div className='adminlogin'>

    <div className='adminLogForm'>

        <form action={`${process.env.REACT_APP_SERVER_IP}/login`} method='post' className='form1' >
        <h1 className='h1'>Admin LogIn Form</h1>
      
          <input className='label' type="email" name="name" placeholder='Email'/>
        
          <input  className='label' name="password" type="password"placeholder='Password'/>
          <hr/>

          <button className='btn' type='submit'>Login</button>
         
        </form>



      </div>

    </div>
  )
}

export default Adminlogin