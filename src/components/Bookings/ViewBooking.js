import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import '../../static/ViewBookings.css';

const ViewBooking=()=>{

    var history= useHistory();
    const {id}= useParams();

    const[Booking, setBooking]= useState({
        name:"",
        consultant:"",
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

    const onClick=async e=>{
        e.preventDefault();
        history.push("/Bookings");
    }

    return(
        <div className="View-Booking-container">
            <div className="py-4">
                <h2 className="text-center mb-4">Details of {Booking.name}</h2>
                <table className="table table-bordered table-striped border shadow">
                    <tbody >
                        <tr>
                            <td><b>Consultant</b></td>
                            <td>{Booking.consultant}</td>
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
                <div className="View-Booking-Button-divison">
                    <button className="View-Booking-Button" onClick={e=>onClick(e)}>Go Back</button>
                </div>
            </div>
        </div>
    );
}

export default ViewBooking;