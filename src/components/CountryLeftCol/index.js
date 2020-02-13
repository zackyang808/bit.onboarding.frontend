import React from "react";

export default function CountryLeftCol({ children }) {
  return (
    <>
      <div className="widget widget-assistant">
              <div className="assistant-message">
                  {children}
              </div>
      </div>
    </>
  );
}
