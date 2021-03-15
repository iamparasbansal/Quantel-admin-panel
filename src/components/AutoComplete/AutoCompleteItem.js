import React from "react";

const AutoCompleteItem = ({
    name,
    email,
    phone,
    onSelectItem,
    isHighlighted
}) => {
    return (
        <li style={{backgroundColor: 'rgb(242, 242, 242)', color: 'rgba(0,0,0,0.6)', fontSize: '18px'}}
            className={`list-group-item ${
                isHighlighted ? "active highlighted" : ""
            }`}
            onClick={onSelectItem}
        >
            <div className="row">
                <div className="col text-left">
                    <p className="mb-0 font-weight-bold line-height-1">
                        {name}
                    </p>
                    <p className="mb-0 badge" style={{backgroundColor: '#17252a', color:'white'}}>{email}</p>
                    <p className="mb-0 ml-2 badge" style={{backgroundColor: '#2b7a78', color:'white'}}>{phone}</p>
                </div>
            </div>
        </li>
    );
};

export default AutoCompleteItem;
