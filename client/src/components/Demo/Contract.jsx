import React, { useRef, useEffect } from "react";

function Contract({ value }) {
  const spanEle = useRef(null);

  // 产生高亮，在300ms后高亮消失
  const myEffect = function () {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  };

  useEffect(myEffect, [value]);

  return (
    <code>
      {`contract SimpleStorage {
  uint256 value = `}

      <span className="secondary-color" ref={spanEle}>
        <font color="yellow">{value}</font>
      </span>

      {`;

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }
}`}
    </code>
  );
}

export default Contract;
