import React,{useState,useEffect} from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import {CUSTOMER,CUSTOMER_PIC} from '../../Utility/Constant'

export default function Admin() {
  const [customer, setcustomer] = useState({})
  const [pic, setpic] = useState("")

  useEffect(()=>{
    customerDetails()
  },[])

  const customerDetails = ()=>{
    var _id = localStorage.getItem("_id")
    axios.get(CUSTOMER+_id)
    .then((response)=>{
      console.log(response.data)
      var custobj = response.data.customer_record
      setcustomer(custobj)
    })
    .catch((err)=>{
      console.log(err)
    })

    axios.get(CUSTOMER_PIC+_id)
    .then((response)=>{
      console.log(response.data)
      var imgurl = response.data.profilepic.upload_doc
      setpic(imgurl)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div>
        <Header />
        <h1>Admin Details</h1>
        <div style={{textAlign:"left",display:'flex'}}>
            <img src={pic}/>
            <div>
            <h3>Name:{customer.name}</h3>
            <h3>Email:{customer.email}</h3>
            <h3>Mobile:{customer.mobile}</h3>
            {/* <h3>Address:{customer.address.state}  {customer.address.city}  {customer.address.pincode}</h3> */}
            <h3>Gender:{customer.gender}</h3>
            </div>
        </div>
    </div>
  )
}
