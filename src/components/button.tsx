import {ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    hidden?: boolean;
}

function Button({children, className, hidden, ...rest}: ButtonProps) {
    return (
        <button
            {...rest}
            className={`button ${className} ${hidden ? "hidden" : ""}`}
        >
            {children}
        </button>
    );
}

export default Button;
