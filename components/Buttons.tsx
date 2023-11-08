import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

type ButtonProps = {
  href: string;
  label: string;
};

type IconButtonProps = ButtonProps & {
  icon: IconProp;
};

export const ArrowButton = (props: ButtonProps) => {
  return (
    <Link href={props.href} className="arrow-btn">
      {props.label}
      <FontAwesomeIcon icon={faArrowRight} />
    </Link>
  );
};

export const ExternalLinkButton = (props: ButtonProps) => {
  return (
    <Link href={props.href} className="external-link-btn">
      {props.label}
      <FontAwesomeIcon icon={faExternalLink} />
    </Link>
  );
};

export const IconExpandButton = (props: IconButtonProps) => {
  return (
    <Link href={props.href} className="main-btn icon-expand-btn">
      <span className="icon-expand-btn-inner">
        <span className="btn-label">{props.label}</span>
        <FontAwesomeIcon icon={props.icon} />
      </span>
    </Link>
  );
};
