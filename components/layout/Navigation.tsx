import { useState } from "react";
import Link from "next/link";
import BSALogo from "../../public/images/logo-no-initials.svg";
import clsx from "clsx";

export default function Navigation(): JSX.Element {
  const [isMenuActive, setMenuActive] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <BSALogo className="bsa-logo" />
            Brittani S Avery
          </a>
        </Link>
        <a
          role="button"
          className={clsx("navbar-burger burger", {
            "is-active": isMenuActive,
          })}
          aria-label="menu"
          aria-expanded="false"
          data-target="navigation-menu"
          onClick={() => setMenuActive(!isMenuActive)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div
        id="navigation-menu"
        className={`navbar-menu${isMenuActive ? " is-active" : ""}`}
      >
        <div className="navbar-start">
          <Link href="/blog">
            <a className="navbar-item">Blog</a>
          </Link>
          <Link href="/resume">
            <a className="navbar-item">Resume</a>
          </Link>
          <Link href="/projects">
            <a className="navbar-item">Projects</a>
          </Link>
          <Link href="/newsletter">
            <a className="navbar-item">Newsletter</a>
          </Link>
        </div>
        <div className="navbar-end" />
      </div>
    </nav>
  );
}
