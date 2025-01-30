import React from "react";

const Child = (props) => {
  const { count, setCount } = props
  const handleMinusClick = () => {
    setCount(count-1);
  };

  const handlePlusClick = () => {
    setCount(count+1);
  };

  return (
    <div>
      <button type="button" className="btn" onClick={handleMinusClick}>
        -
      </button>
      <button type="button" className="btn" onClick={handlePlusClick}>
        +
      </button>
    </div>
  );
};

export default Child;
