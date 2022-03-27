import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import ExternalLink from "../ExternalLink";

export type CardFooterItem = {
  label: string;
  link?: string;
};

type CardFooterProps = {
  items?: CardFooterItem[];
};

type CardImageProps = {
  src: string;
  alt?: string;
};

export function BSACard({ children, className }: BasicProps): JSX.Element {
  return <div className={clsx("card bsa-card", className)}>{children}</div>;
}

export function BSACardImage({ src, alt }: CardImageProps): JSX.Element {
  return (
    <div className="card-image">
      <Image width={960} height={540} src={src} alt={alt} />
    </div>
  );
}

export function BSACardContent({
  children,
  className,
}: BasicProps): JSX.Element {
  return <div className={clsx("card-content", className)}>{children}</div>;
}

export function BSACardFooter({ items }: CardFooterProps): JSX.Element {
  return (
    <div className="card-footer">
      {items.map((item) => {
        if (item.link) {
          const isExternalLink = /^https?/.test(item.link);

          return isExternalLink ? (
            <ExternalLink
              key={item.label}
              href={item.link}
              className="card-footer-item"
            >
              {item.label}
            </ExternalLink>
          ) : (
            <Link key={item.label} href={item.link}>
              <a className="card-footer-item">{item.label}</a>
            </Link>
          );
        } else {
          return (
            <p key={item.label} className="card-footer-item">
              {item.label}
            </p>
          );
        }
      })}
    </div>
  );
}
