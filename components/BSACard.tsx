import clsx from "clsx";
import Link from "next/link";
import React from "react";
import ExternalLink from "./ExternalLink";

type FooterProps = {
  items?: {
    label: string;
    link?: string;
  }[];
};

type ImageProps = {
  src: string;
  alt?: string;
};

export function BSACard({ children, className }: BasicProps): JSX.Element {
  return <div className={clsx("card bsa-card", className)}>{children}</div>;
}

export function BSACardImage({ src, alt }: ImageProps): JSX.Element {
  return (
    <div className="card-image">
      <img src={src} alt={alt} />
    </div>
  );
}

export function BSACardContent({
  children,
  className,
}: BasicProps): JSX.Element {
  return <div className={clsx("card-content", className)}>{children}</div>;
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
