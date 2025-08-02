import React from 'react';

interface CartoonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const CartoonButton: React.FC<CartoonButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`
      px-6 py-3
      bg-[var(--lemonade-2)]
      border-4 border-[var(--lemonade-3)]
      rounded-2xl
      font-bold
      text-lg
      text-[var(--lemonade-3)]
      shadow-[2px_2px_0_0_var(--lemonade-3)]
      transition-transform duration-150
      active:scale-95
      hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--lemonade-3)]
      outline-none
      focus:ring-2 focus:ring-[var(--lemonade-4)]
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export default CartoonButton; 