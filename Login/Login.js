import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom'
import Slider from '../SliderDemo/Slider'
import Footer from '../Footer/Footer'
import { LOGIN } from '../../Utility/Constant'
import axios from 'axios'


export default function Login() {
  const navigate = useNavigate()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()

  const handleSignUp = () => {
    console.log("handleSignUp")
    navigate("/register")
  }

  const handleLogin = (e) => {
    e.preventDefault()
    console.log(email, password)
    let obj = {
      "email": email,
      "password": password
    }
    axios.post(LOGIN,obj)
    .then((response)=>{
      console.log("Response:==>",response)
      const {status,token} = response.data
      const {role,_id,email} = response.data.record
      if (status==true) {
          localStorage.setItem("_id",_id)
          localStorage.setItem("email",email)
          localStorage.setItem("token",token)
          localStorage.setItem("role",role)

          if (response.data.record.status===1) {
              {role === "customer" ? navigate('/customer') : navigate('/admin')}
          } else {
              alert("Please verify customer!")
          }
      }
  })
  .catch((error)=>{
      console.log(error)
      alert(error.response.data.msg)
  })
  }
  return (
    <div>
      <Header />
      <Slider />
      <section className="main-content" >
        <div className="row">
          <div align="center">
            <h4 className="title">
              <span className="text"><strong>Login</strong> Form</span></h4>
            <form onSubmit={handleLogin} method="post" >
              <div className="control-group">
                <label className="control-label"
                  style={{ fontSize: 20, fontWeight: 'bold' }}
                >Email</label>
                <div className="controls">
                  <input type="text" placeholder="Enter your Email" id="email"
                    onChange={(event) => setemail(event.target.value)}

                    style={{ fontSize: 18 }}
                    className="input-xlarge" />
                </div>
              </div>
              <div className="control-group">
                <label className="control-label"
                  style={{ fontSize: 20, fontWeight: 'bold' }}
                >Password</label>
                <div className="controls">
                  <input type="password" placeholder="Enter your password" id="password"
                    style={{ fontSize: 18 }}
                    onChange={(event) => setpassword(event.target.value)}

                    className="input-xlarge" />
                </div>
                <div style={{ textAlign: 'right' }}
                  className="input-xlarge"
                >
                  <p className="reset" >Forgot
                    <a  href="#"
                      title="Recover your username or password"> Username or Password?</a></p>
                </div>

              </div>
              <div>
                <input 
                  className="btn btn-inverse " type="submit"
                  value="LogIn" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input  className="btn btn-inverse large" type="button"
                  onClick={handleSignUp}
                  value="SignUp" />
              </div>
              <hr></hr>
            </form>
          </div>
                  </div>
      </section>
      <Footer />
    </div>
  )
}
