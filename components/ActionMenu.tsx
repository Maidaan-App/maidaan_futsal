"use client"

import React, { useState } from 'react';

const ActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this player?')) {
      alert('Player deleted');
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu}>•••</button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 ">
          <button className="block w-full text-left px-4 py-2 hover:border-l-4 hover:border-primary" onClick={() => alert('Edit clicked')}>
            Edit
          </button>
          <button className="block w-full text-left px-4 py-2 hover:border-l-4 hover:border-primary" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
