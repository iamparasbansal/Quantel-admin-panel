import axios from 'axios';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import '../../static/AddBooking.css';

const AddBooking= ()=>{
    var history= useHistory();
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
    const onSubmit=async e=>{
        e.preventDefault();
        await axios.post("http://localhost:3001/Bookings", Booking);
        history.push("/Bookings");
    }
    return(
    <div className="Add-Booking-Container">
        <div className="booking-card">
            <h2 className="text-center mb-4">Add A Booking</h2>
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
                <button className="Add-Booking-Button">Add the Booking</button>
            </form>
        </div>
    </div>
    );
};

export default AddBooking;