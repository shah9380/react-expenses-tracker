import React from 'react';

const Item = (props) => {
  const changeIt = (event) => {
    props.deleteFunc(props.id);
  };

  return (
    <div className="border border-black bg-gray-300/25 flex justify-around py-4">
      <span>{props.name}</span>
      <div className="flex gap-6 justify-center items-center">
        <span>Rs.{props.cost}</span>
        <p
          onClick={changeIt}
          className="border border-black flex justify-center items-center rounded-full w-5 h-5 cursor-pointer bg-black/25 active:scale-[0.97]"
        >
          x
        </p>
      </div>
    </div>
  );
};

export default Item;
