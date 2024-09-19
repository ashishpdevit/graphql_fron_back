import React, { useState } from 'react';
import './checkbox.css';

const Checkbox = (props) => {

  // State to manage the checkbox value
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    console.log("12", e);
    setIsChecked(!isChecked); // Toggle the checkbox value
  };

  return (
    <>
      <div className="checkbox-container">
        <input
          id={props.value}
          className="custom-control-input"
          name={props.name}
          value={props.value}
          type="checkbox"
          checked={isChecked} // Set the checked attribute based on state
          onChange={handleCheckboxChange} // Handle checkbox change
        />
        {/* <label htmlFor="checkbox" className='checkbox-label'>{props.label}</label> */}
        <label className="custom-control-label" for={props.value}>{props.label}</label>
      </div>
    </>
  );
};

export default Checkbox;