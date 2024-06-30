import React, {useState, useEffect} from 'react';
import './Dropdown.css';

function Dropdown({options, onSelect, position, menuRef, dropdownIndex, isOpen}) {
    const handleSelect = (event) => {
        onSelect(event.target.value);
    }

    return(
        <>
            <div className={`dropdown ${isOpen? 'show' : ''}`} ref={menuRef} style={{position: 'absolute', top: position.top, left: position.left, right: position.right}}>
                {options.map((option, index) => (
                    <button key={index} value={option.value} className="dropdown-item" onClick={handleSelect}>
                        {option.label}
                    </button>
                ))}
            </div>
        </>
    );
}

export default Dropdown;