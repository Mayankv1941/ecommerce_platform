
import React,{useEffect, useState} from 'react'
import {CURL} from '../../Utility/Constant'
export default function Header() {
  const [Header, setHeader] = useState()
	 
  useEffect(()=>{
	const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

	if (role==="admin" && token != null ) {
		setHeader(<div>
			<div id="wrapper" className="container">
					<section className="navbar main-menu">
						<div className="navbar-inner main-menu">
							<a href="index.html" className="logo pull-left">
								<img src="../themes/images/logo.png" className="site_logo" alt=""></img></a>
							<nav id="menu" className="pull-right">
							</nav>
						</div>
					</section>
			</div>
			<div id="top-bar" className="container">
				<div className="row">
					<div className="span4">
						<form method="POST" className="search_form">
							<input type="text" className="input-block-level search-query" placeholder="eg. T-sirt" ></input>
						</form>
					</div>
					<div className="span8">
						<div className="account pull-right">
							<ul className="user-menu">				<li><a href={CURL+"admin/"}>Home</a></li>
							<li><a href={CURL+"admin/managecustomer/"}>ManageCustomer</a></li>
							<li><a href="addproduct/">AddProduct</a></li>
							<li><a href="editprofile/">EditProfile</a></li>
							<li><a href="changepassword/">ChangePassword</a></li>
							<li><a href={CURL+"logout/"}>Logout</a></li>					
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>)
	}
    else if (role==="customer" && token != null ){
		setHeader(<div>
			<div id="wrapper" className="container">
					<section className="navbar main-menu">
						<div className="navbar-inner main-menu">
							<a href="index.html" className="logo pull-left">
								<img src="../themes/images/logo.png" className="site_logo" alt=""></img></a>
							<nav id="menu" className="pull-right">
							</nav>
						</div>
					</section>
			</div>
			<div id="top-bar" className="container">
				<div className="row">
					<div className="span4">
						<form method="POST" className="search_form">
							<input type="text" className="input-block-level search-query" placeholder="eg. T-sirt" ></input>
						</form>
					</div>
					<div className="span8">
						<div className="account pull-right">
							<ul className="user-menu">				<li><a href="customer/">Home</a></li>
							<li><a href="changepassword/">ChangePassword</a></li>
							<li><a href="editprofile/">EditProfile</a></li>
							<li><a href="uploaddocument/">UploadDoc</a></li>
							<li><a href="logout/">Logout</a></li>					
										
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>)
	}
	else{
     setHeader(<div>
		<div id="wrapper" className="container">
                <section className="navbar main-menu">
                    <div className="navbar-inner main-menu">
                        <a href="index.html" className="logo pull-left">
                            <img src="../themes/images/logo.png" className="site_logo" alt=""></img></a>
                        <nav id="menu" className="pull-right">
                        </nav>
                    </div>
                </section>
        </div>
        <div id="top-bar" className="container">
			<div className="row">
				<div className="span4">
					<form method="POST" className="search_form">
						<input type="text" className="input-block-level search-query" placeholder="eg. T-sirt" ></input>
					</form>
				</div>
				<div className="span8">
					<div className="account pull-right">
						<ul className="user-menu">				
							<li><a href="/">Home</a></li>					
							<li><a href="http://localhost:3000/login/">Login</a></li>		
						</ul>
					</div>
				</div>
			</div>
		</div>
    </div>)
	}
  },[])

  return Header
}
