import classes from "./ShoppingListItem.module.css";
import React from "react";

export default function ShoppingListItem(props){
  const { item, ontoggleCompleted, onRemove } = props
  console.log(ontoggleCompleted)
  return (
    
    <div style={{ 
      display: "flex", 
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px"
      }}>
      <input 
        type="checkbox" 
        className="mr-2"
        checked = {item.completed || false}
        onChange={ontoggleCompleted}
        
         />
      <h3 className={`flex-1 ${
        item.completed ? 
        classes.completed : ""
      }`}
      
      style={{
        textDecoration: item.completed ? "line-through" : "none",
        fontSize: "1.5rem",
       }}>

    
      {item.name}
      </h3>
      <button className={classes.removeButton} onClick={onRemove}>x</button>
    </div>
  );
}
