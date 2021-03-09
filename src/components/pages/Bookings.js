import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../../static/Bookings.css';
import {BsFilterRight} from "react-icons/bs";

let bookings_array = [];    
const Bookings= ()=>{
    const[bookings, setBooking]=useState([]);
    const[search, setSearch]=useState("");
    const[searchColumns, setSearchColumns]= useState(["name", "consultant"]);

    useEffect(()=>{
        loadUsers();
    }, []);

    useEffect(()=>{
        if(search.length){
        setBooking(
                bookings_array.filter(Booking =>
                    searchColumns.some(
                        (column)=> Booking[column].toString().toLowerCase().includes(search.toLowerCase())
                    )
                )
            )
        }else{
            setBooking(bookings_array)
        }
    }, [search, bookings]);


    const loadUsers= async()=>{
        const result =await axios.get("http://localhost:3001/Bookings");
        bookings_array=result.data.reverse();
        setBooking(bookings_array);
    };

    const deleteUser=async id => {
        await axios.delete(`http://localhost:3001/Bookings/${id}`);
        loadUsers();
    }

    const columns= bookings[0] && Object.keys(bookings[0]);
    return(
        <div className="Booking-page-container">
            <h2 className="text-center mb-4">Bookings Page</h2>
            <table class="table table-bordered table-striped border shadow">
                <thead className="thead-search-filter">
                    <tr>
                        <th scope="col" colSpan={6}>
                            <BsFilterRight/> &nbsp;
                            <input className="search-field-input"
                                placeholder=" Search....."
                                onChange={e=>setSearch(e.target.value)}
                            /> 
                            {
                                columns && columns.map(column=> <span>
                                <input type="checkbox" checked={searchColumns.includes(column)}
                                    onChange={(e)=>{
                                        const checked= searchColumns.includes(column)
                                        setSearchColumns(prev=>checked
                                            ? prev.filter(sc=>sc!== column)
                                            : [...prev, column]
                                        );
                                    }}
                                />
                                    &nbsp;{column}&nbsp;
                                </span> 
                                )
                            } 
                        </th>
                    </tr>
                </thead>
          
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Consultant</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((Booking,index)=>(
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{Booking.name}</td>
                            <td>{Booking.consultant}</td>
                            <td>{Booking.email}</td>
                            <td>{Booking.phone}</td>
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