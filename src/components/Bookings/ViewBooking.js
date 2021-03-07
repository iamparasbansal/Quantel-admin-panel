import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import '../../static/ViewBookings.css'
const ViewBooking=()=>{

    const {id}= useParams();

    const[Booking, setBooking]= useState({
        name:"",
        username:"",
        email:"",
        phone:"",
        website:""
    });

    useEffect(()=>{
        loadUser()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadUser=async ()=>{
        const result=await axios.get(`http://localhost:3001/Bookings/${id}`);
        setBooking(result.data);
    }

    return(
        <div className="View-Booking-container">
            <div className="py-4">
                <h2 className="text-center mb-4">Details of {Booking.name}</h2>
                <table className="table table-bordered table-striped border shadow">
                    <tbody >
                        <tr>
                            <td><b>Username</b></td>
                            <td>{Booking.username}</td>
                        </tr>
                        <tr>
                            <td><b>Phone Number</b></td>
                            <td>{Booking.phone}</td>
                        </tr>   
                        <tr>
                            <td><b>Email</b></td>
                            <td>{Booking.email}</td>
                        </tr>
                        <tr>
                            <td><b>Website</b></td>
                            <td>{Booking.website}</td>
                        </tr>       
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewBooking;