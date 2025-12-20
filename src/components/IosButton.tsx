import React from 'react';
import { IoArrowForwardCircleOutline } from "react-icons/io5";

interface IosButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    icon?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}

export default function IosButton({ text, icon, className = '', children, ...props }: IosButtonProps) {
    return (
        <button className={`ios-button ${className}`} {...props}>
            {children ? children : (
                <>
                    <span>{text}</span>
                    {icon || <IoArrowForwardCircleOutline size={20} />}
                </>
            )}
        </button>
    );
}
