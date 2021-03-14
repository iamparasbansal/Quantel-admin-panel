import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import '../../static/ViewConsultants.css';

const ViewConsultant=()=>{

    var history= useHistory();
    const {id}= useParams();

    const[Consultant, setConsultant]= useState({
        name:"",
        NickName:"",
        email:"",
        phone:"",
        website:""
    });

    useEffect(()=>{
        loadConsultant()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadConsultant=async ()=>{
        const result=await axios.get(`http://localhost:3001/Consultants/${id}`);
        setConsultant(result.data);
    }

    const onClick=async e=>{
        e.preventDefault();
        history.push("/consultants");
    }

    return(
        <div className="View-Consultant-container">
            <div className="py-4">
                <h2 className="text-center mb-4">Details of {Consultant.name}</h2>
                <table className="table table-bordered table-striped border shadow">
                    <tbody >
                        <tr>
                            <td><b>Consultant</b></td>
                            <td>{Consultant.NickName}</td>
                        </tr>
                        <tr>
                            <td><b>Phone Number</b></td>
                            <td>{Consultant.phone}</td>
                        </tr>   
                        <tr>
                            <td><b>Email</b></td>
                            <td>{Consultant.email}</td>
                        </tr>
                        <tr>
                            <td><b>Website</b></td>
                            <td>{Consultant.website}</td>
                        </tr>       
                    </tbody>
                </table>
                <div className="View-Consultant-Button-divison">
                    <button className="View-Consultant-Button" onClick={e=>onClick(e)}>Go Back</button>
                </div>
            </div>
        </div>
    );
}

export default ViewConsultant;