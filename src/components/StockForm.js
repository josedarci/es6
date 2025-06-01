import React, { useState, useEffect } from 'react';

function StockForm({ onSubmit, itemToEdit }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setQuantity(itemToEdit.quantity);
    } else {
      setName('');
      setQuantity('');
    }
  }, [itemToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || quantity === '') {
      alert('Please fill in all fields.');
      return;
    }
    onSubmit({ name, quantity: parseInt(quantity, 10) });
    // Clear form if not editing (or handle clearing in App.js)
    if (!itemToEdit) {
        setName('');
        setQuantity('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{itemToEdit ? 'Edit Item' : 'Add New Item'}</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <button type="submit">{itemToEdit ? 'Update Item' : 'Add Item'}</button>
      {itemToEdit && <button type="button" onClick={() => onSubmit(null)}>Cancel Edit</button>} {/* Optional: way to cancel edit mode */}
    </form>
  );
}

export default StockForm;
