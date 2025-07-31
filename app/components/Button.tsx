import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    form?: string;
}

const Button = ({ onClick, children, className, type = "button", form }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full text-white px-8 py-2 rounded-lg cursor-pointer ${className}`}
            form={form}
        >
            {children}
        </button>
    )
}

export default Button