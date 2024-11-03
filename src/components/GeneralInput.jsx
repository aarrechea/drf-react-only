// Imports
import React, { forwardRef } from "react";
import "./css/generalInput.css";



// General input component
export const GeneralInput = forwardRef((props, ref) => {

    const {style, className, maxLength, value, onChange, placeholder, onFocus, onBlur, onInput} = props;

    return (
        <input 
            id="generalInput"
            type="text" 
            style={style}
            className={className}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onInput={onInput}
            placeholder={placeholder}
            ref={ref}
        />
    );
});





