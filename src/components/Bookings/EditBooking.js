import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import '../../static/EditBooking.css';

const EditBooking= ()=>{
    var history= useHistory();
    const {id}= useParams();
    const[Booking, setBooking]= useState({
        name:"",
        username:"",
        email:"",
        phone:"",
        website:""
    });

    const {name, username, email, phone, website}=Booking;
    const onInputChange=e=>{
        setBooking({...Booking, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        loadUser()
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit=async e=>{
        e.preventDefault();
        await axios.put(`http://localhost:3001/Bookings/${id}`, Booking);
        history.push("/Bookings");
    }

    const loadUser=async ()=>{
        const result=await axios.get(`http://localhost:3001/Bookings/${id}`);
        setBooking(result.data);
    }
    return(
    <div className="Edit-Booking-container">
        <h2 className="text-center mb-4">Edit Booking</h2>
        <form onSubmit={e=>onSubmit(e)}>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="Enter Name"
                    name="name"
                    id="input-name"
                    value={name}
                    onChange={e=>onInputChange(e)}
                />
            </div>

            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="Enter Username"
                    name="username"
                    id="input-username"
                    value={username}
                    onChange={e=>onInputChange(e)}
                />
            </div>

            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="Enter Phone Number"
                    name="phone"
                    id="input-phone-number"
                    value={phone}
                    onChange={e=>onInputChange(e)}
                />
            </div>

            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="Enter Email Address"
                    name="email"
                    id="input-Email-Address"
                    value={email}
                    onChange={e=>onInputChange(e)}
                />
            </div>

            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="Enter Website Name"
                    name="website"
                    id="input-website-name"
                    value={website}
                    onChange={e=>onInputChange(e)}
                />
            </div>

            <button className="Edit-Booking-Button">Update Changes</button>
        </form>
    </div>
    );
};

export default EditBooking;