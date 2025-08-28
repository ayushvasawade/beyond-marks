'use client';
import React from 'react';

const TheGuide: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-6">
      {/* Headline */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--lemonade-3)] mb-2">
          Let&apos;s Make a List!
        </h1>
        <p className="text-sm text-[var(--lemonade-3)] opacity-80">
          Learn how to create and manipulate lists in JavaScript
        </p>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Lesson Text */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[var(--lemonade-3)] mb-3">
            What are Arrays?
          </h2>
          <p className="text-[var(--lemonade-3)] mb-4 leading-relaxed">
            Arrays are like containers that can hold multiple items. Think of them as a shopping list where you can add, remove, and organize items easily.
          </p>
          
          {/* Illustration Placeholder */}
          <div className="bg-[var(--lemonade-1)] border-2 border-[var(--lemonade-3)] rounded-xl p-4 mb-4 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl mb-2 block">📝</span>
              <p className="text-sm text-[var(--lemonade-3)]">Shopping List Illustration</p>
            </div>
          </div>
        </div>
        
        {/* Code Snippet */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-[var(--lemonade-3)] mb-3">
            Example Code:
          </h3>
          <div className="bg-[var(--lemonade-5)] border-2 border-[var(--lemonade-3)] rounded-xl p-4">
            <pre className="text-[var(--lemonade-1)] text-sm overflow-x-auto">
{`// Creating an array
let fruits = ["apple", "banana", "orange"];

// Adding an item
fruits.push("grape");

// Accessing items
console.log(fruits[0]); // "apple"`}
            </pre>
          </div>
        </div>
        
        {/* Key Points */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-[var(--lemonade-3)] mb-3">
            Key Points:
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[var(--lemonade-4)] mt-1">•</span>
              <span className="text-sm text-[var(--lemonade-3)]">Arrays start counting from 0</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--lemonade-4)] mt-1">•</span>
              <span className="text-sm text-[var(--lemonade-3)]">Use push() to add items</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--lemonade-4)] mt-1">•</span>
              <span className="text-sm text-[var(--lemonade-3)]">Use length to count items</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Task Box */}
      <div className="bg-[var(--lemonade-2)] border-2 border-[var(--lemonade-3)] rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xl">📋</span>
          <h3 className="font-semibold text-[var(--lemonade-3)]">Your Task:</h3>
        </div>
        <p className="text-sm text-[var(--lemonade-3)]">
          Create an array called &quot;myColors&quot; with three colors of your choice, then add a fourth color using push().
        </p>
      </div>
    </div>
  );
};

export default TheGuide; 