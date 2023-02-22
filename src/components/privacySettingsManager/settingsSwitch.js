import React from "react";

const SettingsSwitch = ({ currentState, label, toggleState, disabled = false }) => (
  <div className='flex items-center py-2 flex-gap-2'>
    <label className='switch'>
      <input
        id={label}
        type={"checkbox"}
        checked={currentState}
        onChange={toggleState}
        disabled={disabled}
      />
      <span className='slider'></span>
    </label>
    <label
      className='block text-md uppercase font-bold text-blue-primary tracking-[0.1rem] cursor-pointer ml-2'
      dangerouslySetInnerHTML={{ __html: label }}
      htmlFor={label}
    />
  </div>
);

export default SettingsSwitch;
