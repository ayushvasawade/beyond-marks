import React from 'react';

interface CartoonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const CartoonButton: React.FC<CartoonButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`
      px-6 py-3
      bg-white
      border-4 border-black
      rounded-2xl
      font-bold
      text-lg
      shadow-[2px_2px_0_0_black]
      transition-transform duration-150
      active:scale-95
      hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black]
      outline-none
      focus:ring-2 focus:ring-black
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export default CartoonButton; 