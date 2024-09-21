import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { storeContext } from '../../data/storeContext'
import './Verify.css'

const Verify = () => {
  const { url } = useContext(storeContext)
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
    const response = await axios.post(url + "/api/order/verify", { success, orderId });
    if (response.data.success) {
      console.log("dataaaaaaaa", response)
      navigate("/");
    }
    else {
      console.log("Payment not verified:", response.data);
      navigate("/"); 
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    navigate("/"); // Optionally handle error
}
  }

  useEffect(() => {
    verifyPayment();
  }, [])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
