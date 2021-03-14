import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import '../../static/EditConsultant.css';

const EditConsultant= ()=>{
    var history= useHistory();
    const {id}= useParams();
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

    useEffect(()=>{
        loadUser()
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit=async e=>{
        e.preventDefault();
        await axios.put(`http://localhost:3001/Consultants/${id}`, Consultant);
        history.push("/consultants");
    }

    const loadUser=async ()=>{
        const result=await axios.get(`http://localhost:3001/Consultants/${id}`);
        setConsultant(result.data);
    }
    return(
    <div className="Edit-Consultant-container">
    <div className="Edit-Consultant-card">
        <h2 className="text-center mb-4">Edit Consultant</h2>
        <form onSubmit={e=>onSubmit(e)}>
            <div className="form-group">
            Name
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
            NickName
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
            Phone Number
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
            Email Address
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
            Website Name
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

            <button className="Edit-Consultant-Button">Update Changes</button>
        </form>
    </div>
    </div>
    );
};

export default EditConsultant;