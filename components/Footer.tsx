import React from "react";
import BSAFullLogo from "../public/images/logo-initials.svg";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bsa-margin footer bsa-footer">
      <div className="container">
        <div className="columns">
          <div className="column p-5 is-narrow">
            <p className="has-text-centered-mobile is-size-3-tablet is-size-2-mobile">
              <BSAFullLogo className="bsa-full-logo" />
              Brittani S Avery
            </p>
          </div>
          <div className="column">
            <p className="is-size-7 has-text-centered">
              Copyright &copy; {currentYear} Brittani S Avery
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
