import React from "react";

function PasswordChecks({ password }) {
  const capitalCharReg = new RegExp("(?=.*[A-Z])");
  const smallCharReg = new RegExp("(?=.*[a-z])");
  const numberReg = new RegExp(`(?=.*[0-9])`);
  const specialCharReg = new RegExp("(?=.*[@$!%*?&])");
  return (
    <>
      <div
        style={{
          padding: "1rem",
          color: password && capitalCharReg.test(password) ? "green" : "red",
        }}
      >
        Ensure there is at least one uppercase letter
      </div>
      <div
        style={{
          padding: "1rem",
          color: password && smallCharReg.test(password) ? "green" : "red",
        }}
      >
        Ensure there is at least one lowercase letter.
      </div>
      <div
        style={{
          padding: "1rem",
          color: password && numberReg.test(password) ? "green" : "red",
        }}
      >
        Ensure there is at least one digit.
      </div>
      <div
        style={{
          padding: "1rem",
          color: password && specialCharReg.test(password) ? "green" : "red",
        }}
      >
        Ensure there is at least one special character(@$!%*?&).
      </div>
      <div
        style={{
          padding: "1rem",
          color: password && password.length >= 8 ? "green" : "red",
        }}
      >
        Ensure least 8 characters.
      </div>
    </>
  );
}

export default PasswordChecks;
