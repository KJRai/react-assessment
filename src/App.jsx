import "./App.css";
import { useState } from "react"
import  ShoppingListItem  from "./components/ShoppingListItem"

export default function App() {

  const [items, setItems] = useState([])

  const [newItem, setNewItem] = useState("")

  const addItems = (e) => {
    e.preventDefault();
    const isDuplicate = items.some(
      (item) => item.name.toLowerCase() === newItem.toLowerCase()
    );
    
    if (isDuplicate) {
      alert("This item already exists in the list.");
      setNewItem("");
      return;
    }
      setItems(prevItems => [...prevItems, { name: newItem, completed: false }]);
      setNewItem("");
  };

  const toggleCompleted = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };
  const removeItems = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };
  return (
    <div className="container">
      <h1 className="mb-4">My Shopping List</h1>

      <div className="flex gap-4 pb-3 border-b-2 border-gray-700">
        <form onSubmit={addItems} className="add-item-form">
          <input
            type="text"
            placeholder="E.g. Carrots"
            className="form-input"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            name="item"
          />
          <button className="v__button" type="submit" disabled = {newItem === ""} >Add</button>
        </form>
      </div>
      <div className="v__list-container overflow-y-scroll">
        <li>
          {items.map((item, index) => (
            <ShoppingListItem
              key={index}
              item={item}
              ontoggleCompleted={() => toggleCompleted(index)}
              onRemove={() => removeItems(index)}
            />
          ))}
        </li>
      </div>
    </div>
  );
}

