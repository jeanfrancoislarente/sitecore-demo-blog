import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

type ButtonProps = {
  href: string;
  label: string;
};

export const ArrowButton = (props: ButtonProps) => {
  return (
    <Link href={props.href} className="arrow-btn">
      {props.label}
      <FontAwesomeIcon icon={faArrowRight} />
    </Link>
  );
};
