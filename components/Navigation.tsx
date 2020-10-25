import React from "react";
import Link from "next/link";

export default function Navigation(): JSX.Element {
  const [isMenuActive, setMenuActive] = React.useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">Brittani S Avery</a>
        </Link>
        <a
          role="button"
          className={`navbar-burger burger${isMenuActive ? " is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navigation-menu"
          onClick={() => setMenuActive(true)}
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
        </div>
      </div>
    </nav>
  );
}
