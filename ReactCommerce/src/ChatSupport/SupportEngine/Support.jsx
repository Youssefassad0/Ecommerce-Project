import React, { useRef, useEffect, useState } from "react";
import SupportWindow from "./SupportWindow/window";
import Avatar from "./Avatar";

const SupportEngine = () => {
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState("none");

  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <>
      <div ref={ref}>
        <SupportWindow visible={visible} style={{display:"none" }} />
        <Avatar
          onClick={() => setVisible(true)}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
          }}
        />
      </div>
    </>
  );
};
export default SupportEngine;
