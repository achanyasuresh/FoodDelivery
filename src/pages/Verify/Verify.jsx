import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'

const Verify = () => {
  const url  = "https://fooddeliverybackend-29bk.onrender.com"
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + `/api/order/verify?success=${success}&orderId=${orderId}`);
    if (response.data.success) {
        navigate("/");
    } else {
        navigate("/");
    }
};
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
