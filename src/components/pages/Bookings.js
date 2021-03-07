import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../../static/Bookings.css'

const Bookings= ()=>{
    const[Bookings, setBooking]=useState([]);

    useEffect(()=>{
        loadUsers();
    }, []);

    const loadUsers= async()=>{
        const result =await axios.get("http://localhost:3001/Bookings");
        setBooking(result.data.reverse());
    };

    const deleteUser=async id => {
        await axios.delete(`http://localhost:3001/Bookings/${id}`);
        loadUsers();
    }

    return(
        <div className="Booking-page-container">
            <h2 className="text-center mb-4">Bookings Page</h2>
            <table class="table table-bordered table-striped border shadow">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Bookings.map((Booking,index)=>(
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{Booking.name}</td>
                            <td>{Booking.username}</td>
                            <td>{Booking.email}</td>
                            <td>
                                <Link class="btn btn-primary mr-2" to={`/Bookings/view/${Booking.id}`}>View</Link>
                                <Link class="btn btn-outline-primary mr-2" to={`/Bookings/edit/${Booking.id}`}>Edit</Link>
                                <Link class="btn btn-danger" onClick={()=>deleteUser(Booking.id)}>Delete</Link>
                            </td>
                        </tr>   
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Bookings;