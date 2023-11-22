import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useCallback, useState } from 'react';

type ButtonProps = {
  href: string;
  label: string;
};

type IconButtonProps = ButtonProps & {
  icon: IconProp;
};

type MultiActionButtonProps = {
  label: string;
  icon: IconProp;
  actions: IconButtonProps[];
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

export const MultiActionButton = (props: MultiActionButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <div className={`multi-action-button ${isExpanded ? 'expanded' : ''}`}>
      <div className="multi-action-button-main-container">
        <button
          onClick={handleClick}
          className={`main-btn icon-expand-btn ${isExpanded ? 'expanded' : ''}`}
        >
          <span className="icon-expand-btn-inner">
            <span className="btn-label">{props.label}</span>
            <FontAwesomeIcon icon={props.icon} />
          </span>
        </button>
      </div>
      <div className="multi-action-button-extra-container">
        {props.actions.map(
          (action, i) =>
            action.href && (
              <Link
                key={action.href}
                href={action.href}
                className="simple-btn"
                style={{
                  transform: `translateY(calc(${i + 1} * (-100% - 1rem)))`,
                }}
              >
                {action.label}
                <FontAwesomeIcon icon={action.icon} />
              </Link>
            )
        )}
      </div>
    </div>
  );
};
