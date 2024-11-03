// Imports
import React, { forwardRef } from "react";
import "./css/textArea.css";



// Textarea component
export const TextArea = forwardRef((props, ref) => {

    const {style, className, maxLength, value, onChange, onBlur, onInput, onFocus, placeholder} = props;


    return (        
        <textarea 
            id="generalTextArea"
            style={style}
            className={className}
            maxLength={maxLength}
            value={value}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            onInput={onInput}
            onFocus={onFocus}
            placeholder={placeholder}
        />                    
    );
});




