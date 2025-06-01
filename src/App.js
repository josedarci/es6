import React, { useState } from 'react';
import StockList from './components/StockList';
import StockForm from './components/StockForm';
import './App.css'; // Added import

function App() {
  const [stockItems, setStockItems] = useState([
    { id: 1, name: 'Product A', quantity: 100 },
    { id: 2, name: 'Product B', quantity: 50 },
    { id: 3, name: 'Product C', quantity: 75 },
  ]);
  const [editingItem, setEditingItem] = useState(null);

  const generateId = () => Date.now(); // Simple ID generator

  // Combined function to handle add or update
  const handleFormSubmit = (itemData) => {
    if (editingItem) { // If there's an item being edited
      if (itemData === null) { // Handle cancel edit
        setEditingItem(null);
        return;
      }
      // Update existing item
      setStockItems(
        stockItems.map(item =>
          item.id === editingItem.id ? { ...editingItem, ...itemData } : item
        )
      );
      setEditingItem(null); // Clear editing state
    } else {
      // Add new item
      setStockItems([...stockItems, { ...itemData, id: generateId() }]);
    }
  };

  const handleDeleteItem = (itemId) => {
    setStockItems(stockItems.filter(item => item.id !== itemId));
  };

  const handleEditItem = (item) => {
    setEditingItem(item); // Set the item to be edited
  };

  return (
    <div>
      <h1>Stock Management</h1>

      <StockForm
        onSubmit={handleFormSubmit}
        itemToEdit={editingItem}
      />

      <StockList
        items={stockItems}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
    </div>
  );
}

export default App;
