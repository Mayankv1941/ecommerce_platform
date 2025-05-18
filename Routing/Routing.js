import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Index from '../Index/Index'
import ProductDetails from '../ProductDetails/ProductDetails'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Customer from '../Customer/Customer'
import Admin from '../Admin/Admin'
import Logout from '../Logout/Logout'
import ManageCustomer from '../ManageCustomer/ManageCustomer'
export default function Routing() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<Index />}></Route>
                <Route path='logout/' element={<Logout />}></Route>
                
                <Route path='login/' element={<Login />}></Route>
                <Route path='customer/' element={<Customer />}></Route>
                <Route path='admin/' element={<Admin />}></Route>
                <Route path='admin/managecustomer/' element={<ManageCustomer />}></Route>
                <Route path='register/' element={<Register />}></Route>
                <Route path='productdetails/:id' element={<ProductDetails />}></Route>
            </Routes>
        </Router>
    </div>
  )
}
