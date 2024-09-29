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
    const response = await axios.get(url + `/api/order/verify?success=${success}&orderId=${orderId}`);
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
