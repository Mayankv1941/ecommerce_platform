import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Slider from '../SliderDemo/Slider'
import Footer from '../Footer/Footer'

export default function Register() {

  const handleSignUp = () => {
    console.log("handleSignUp")
  }
  return (
    <div>
      <Header />
      <Slider />
      <section className="main-content" >
        <div className="row">
          <div align="center">
            <h4 className="title">
              <span className="text"><strong>Register</strong> Form</span></h4>
            <form action="#" method="post" >
              <div className="control-group">
                <label className="control-label"
                  style={{ fontSize: 20,  }}
                >Name</label>
                <div className="controls">
                  <input type="text" placeholder="Enter your Name" id="name"
                    style={{ fontSize: 18 }}
                    className="input-xlarge" />
                </div>
              </div>
              <div className="control-group">
                <label className="control-label"
                  style={{ fontSize: 20,  }}
                >Email</label>
                <div className="controls">
                  <input type="text" placeholder="Enter your Email" id="email"
                    style={{ fontSize: 18 }}
                    className="input-xlarge" />
                </div>
              </div>
              <div className="control-group">
                <label className="control-label"
                  style={{ fontSize: 20,  }}
                >Password</label>
                <div className="controls">
                  <input type="password" placeholder="Enter your Password" id="password"
                    style={{ fontSize: 18 }}
                    className="input-xlarge" />
                </div>
              </div>
              <div className="control-group">
                <label className="control-label"
                  style={{ fontSize: 20,  }}
                >Mobile</label>
                <div className="controls">
                  <input type="text" placeholder="Enter your Mobile" id="mobile"
                    style={{ fontSize: 18 }}
                    className="input-xlarge" />
                </div>
              </div>
              <div className="control-group">
                <label className="control-label" style={{ fontSize: 20,  }}><span
                ></span> State</label>
                <div >
                  <select className="input-xlarge" style={{ fontSize: 18,  }}>
                    <option value="">Select a State</option>
                    <option value="M.P">M.P</option>
                    <option value="U.P">U.P</option>
                    <option value="Maharastra">Maharastra</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>
              </div>
              <div className="control-group">
                <label className="control-label" style={{ fontSize: 20,  }}><span
                ></span> City</label>
                <div >
                  <select className="input-xlarge" style={{ fontSize: 18,  }}>
                    <option value="">Select a City</option>
                    <option value="Indore">Indore</option>
                    <option value="Ujjain">Ujjain</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>
              </div>
              <div className="control-group">
                <label className="control-label"
                  style={{ fontSize: 20,  }}
                >Pincode</label>
                <div className="controls">
                  <input type="text" placeholder="Enter your Pincode" id="pincode"
                    style={{ fontSize: 18 }}
                    className="input-xlarge" />
                </div>
              </div>
              <div>
                <input tabindex="3" className="btn btn-inverse large" type="button"
                  onClick={handleSignUp}
                  value="SignUp" />
              </div>
              <hr></hr>
            </form>
          </div>
          {/* <div className="span7">
                  <h4 className="title"><span className="text"><strong>Register</strong> Form</span></h4>
                  <form action="#" method="post" className="form-stacked">
                    <fieldset>
                      <div className="control-group">
                        <label className="control-label">Username</label>
                        <div className="controls">
                          <input type="text" placeholder="Enter your username" className="input-xlarge" />
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label">Email address:</label>
                        <div className="controls">
                          <input type="password" placeholder="Enter your email" className="input-xlarge" />
                        </div>
                      </div>
                      <div className="control-group">
                        <label className="control-label">Password:</label>
                        <div className="controls">
                          <input type="password" placeholder="Enter your password" className="input-xlarge" />
                        </div>
                      </div>
                      <div className="control-group">
                        <p>Now that we know who you are. I'm not a mistake! In a comic, you know how you can
                          tell who the arch-villain's going to be?</p>
                      </div>
                      <hr></hr>
                      <div className="actions"><input tabindex="9" className="btn btn-inverse large" type="submit"
                        value="Create your account" /></div>
                    </fieldset>
                  </form>
                </div> */}
        </div>
      </section>
      <Footer />
    </div>
  )
}
