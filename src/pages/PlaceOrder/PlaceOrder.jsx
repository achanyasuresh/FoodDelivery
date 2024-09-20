import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { storeContext } from '../../data/storeContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const [payment, setPayment] = useState("cod");
    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems, currency, deliveryCharge } = useContext(storeContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
        return /^[0-9]{10,15}$/.test(phone); // Adjust regex for your specific phone number format
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));

        // Inline validation
        let newErrors = { ...errors };
        if (value.trim() === '') {
            newErrors[name] = `${name} is required`;
        } else if (name === 'email' && !validateEmail(value)) {
            newErrors.email = 'Invalid email address';
        } else if (name === 'phone' && !validatePhone(value)) {
            newErrors.phone = 'Invalid phone number';
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };

    const validateForm = () => {
        let newErrors = {};

        Object.keys(data).forEach((key) => {
            if (data[key].trim() === '') {
                newErrors[key] = `${key} is required`;
            }
        });

        if (data.email && !validateEmail(data.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (data.phone && !validatePhone(data.phone)) {
            newErrors.phone = 'Invalid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        let orderItems = [];
        food_list.forEach(item => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        };

        if (payment === "stripe") {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert("Something Went Wrong");
            }
        } else {
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders");
                alert(response.data.message);
                setCartItems({});
            } else {
                alert("Something Went Wrong");
            }
        }
    };

    useEffect(() => {
        if (!token) {
            alert("To place an order, sign in first");
            navigate('/');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                {errors.email && <p className="error">{errors.email}</p>}
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                {errors.street && <p className="error">{errors.street}</p>}
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    {errors.city && <p className="error">{errors.city}</p>}
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                    {errors.state && <p className="error">{errors.state}</p>}
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    {errors.zipcode && <p className="error">{errors.zipcode}</p>}
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                    {errors.country && <p className="error">{errors.country}</p>}
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
                {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.unchecked} alt="" />
                        <p>COD ( Cash on delivery )</p>
                    </div>
                    <div onClick={() => setPayment("stripe")} className="payment-option">
                        <img src={payment === "stripe" ? assets.checked : assets.unchecked} alt="" />
                        <p>Stripe ( Credit / Debit )</p>
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <button className='place-order-submit' type='submit'>{payment === "cod" ? "Place Order" : "Proceed To Payment"}</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
