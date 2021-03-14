import React from "react";

const AutoCompleteItem = ({
    name,
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
                </div>
            </div>
        </li>
    );
};

export default AutoCompleteItem;
