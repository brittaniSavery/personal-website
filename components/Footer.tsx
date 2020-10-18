import React from "react";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bsa-margin footer bsa-footer">
      <div className="container">
        <div className="columns">
          <div className="column">Email Sign-Up</div>
          <div className="column is-4">Find Me On</div>
        </div>
        <p>Copyright &copy; {currentYear} Brittani S Avery</p>
      </div>
    </footer>
  );
}
