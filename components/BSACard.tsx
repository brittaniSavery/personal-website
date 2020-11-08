import Link from "next/link";
import React from "react";
import ExternalLink from "./ExternalLink";

type FooterLink = {
  label: string;
  link?: string;
};

type FooterProps = {
  items?: FooterLink[];
};

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  children?: React.ReactNode;
};

export function BSACard({ children }: Props): JSX.Element {
  return <div className="card bsa-card">{children}</div>;
}

export function BSACardImage({ src, alt }: ImageProps): JSX.Element {
  return (
    <div className="card-image">
      <img src={src} alt={alt} />
    </div>
  );
}

export function BSACardContent({ children }: Props): JSX.Element {
  return <div className="card-content">{children}</div>;
}

export function BSACardFooter({ items }: FooterProps): JSX.Element {
  return (
    <div className="card-footer">
      {items.map((item) => {
        if (item.link) {
          const isExternalLink = /^https?/.test(item.link);

          return isExternalLink ? (
            <ExternalLink href={item.link} className="card-footer-item">
              {item.label}
            </ExternalLink>
          ) : (
            <Link href={item.link}>
              <a className="card-footer-item">{item.label}</a>
            </Link>
          );
        } else {
          return <p className="card-footer-item">{item.label}</p>;
        }
      })}
    </div>
  );
}
