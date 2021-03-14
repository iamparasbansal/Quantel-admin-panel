import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import '../../static/AddConsultant.css';

const AddConsultant= ()=>{
    var history= useHistory();

    const[Consultant, setConsultant]= useState({
        name:"",
        NickName:"",
        email:"",
        phone:"",
        website:""
    });

    const {name, NickName, email, phone, website}=Consultant;
    const onInputChange=e=>{
        setConsultant({...Consultant, [e.target.name]: e.target.value})
    }

    const onSubmit=async e=>{
        e.preventDefault();
        await axios.post("http://localhost:3001/Consultants", Consultant);
        history.push("/consultants");
    }

    return(
    <div className="Add-Consultant-Container">
        <div className="Add-Consultant-card">
            <h2 className="text-center mb-4">Add A Consultant</h2>
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
                        placeholder="Enter NickName"
                        name="NickName"
                        id="input-NickName"
                        value={NickName}
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
                <button className="Add-Consultant-Button">Add the Consultant</button>
            </form>
        </div>
    </div>
    );
};

export default AddConsultant;