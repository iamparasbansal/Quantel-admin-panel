import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Autocomplete from '../AutoComplete';
import '../../static/AddBooking.css';

const AddBooking= ()=>{
    var history= useHistory();

    window.addEventListener('keydown',function(e){
        if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){
            if(e.target.nodeName=='INPUT'&&e.target.type=='text'){
                e.preventDefault();return false;
            }
        }
    },true);

    const[allConsultants, setAllConsultants]=useState([]);
    const[Booking, setBooking]= useState({
        name:"",
        consultant:"",
        email:"",
        phone:"",
        website:""
    });

    
    useEffect(()=>{
        loadConsultants();
    }, []);

    const loadConsultants= async()=>{
        const result =await axios.get("http://localhost:3001/Consultants");
        setAllConsultants(result.data.reverse());
    };

    const {name, consultant, email, phone, website}=Booking;
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
        <div className="Add-booking-card">
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
                    <Autocomplete
                        AutoPlaceholder="Enter Consultant"
                        defaultValue={consultant}
                        data={allConsultants}
                        onSelect={consultantSelected => setBooking({...Booking, consultant:consultantSelected.name})}
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