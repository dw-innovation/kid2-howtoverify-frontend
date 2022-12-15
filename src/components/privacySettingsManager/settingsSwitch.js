import React from "react";

const SettingsSwitch = ({ currentState, label, toggleState }) => (
  <div className='flex flex-gap-2 pb-2 items-center'>
    <label className='switch'>
      <input
        id={label}
        type={"checkbox"}
        checked={currentState}
        onChange={toggleState}
      />
      <span className='slider'></span>
    </label>
    <label
      className='block text-md uppercase font-bold text-grey-footer tracking-[0.1rem] cursor-pointer ml-2'
      dangerouslySetInnerHTML={{ __html: label }}
      htmlFor={label}
    />
  </div>
);

export default SettingsSwitch;
