import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import { MANAGE_CUSTOMER, CUSTOMER_LIST } from '../../Utility/Constant'

export default function ManageCustomer() {

    const [customers, setcustomers] = useState([])

    useEffect(() => {
        customerList()
    }, [])

    const customerList = () => {
        var _id = localStorage.getItem("_id")
        axios.get(CUSTOMER_LIST)
            .then((response) => {
                console.log(response.data)
                var list = response.data.customerlist
                console.log(list)
                setcustomers(list)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <Header />


            <div class="span9">
                <h4 class="title"><span class="text"><strong>Manage</strong>  & View Customers</span></h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer,index)=>
                        <tr>
                            <td>{index+1}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.mobile}</td>
                            <td>{customer.address.state} {customer.address.city} {customer.address.pincode}</td>
                            <td>{customer.gender}</td>
                        </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
