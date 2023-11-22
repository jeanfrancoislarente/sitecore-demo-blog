import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

type AuthorSocialsProps = {
  linkedin?: string;
  twitter?: string;
};

export default function AuthorSocials({ linkedin, twitter }: AuthorSocialsProps) {
  return (
    <div className="social-brands">
      {linkedin && (
        <Link href={linkedin}>
          <div className="social-brands-button social-brands-linkedin">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </div>
        </Link>
      )}
      {twitter && (
        <Link href={twitter}>
          <div className="social-brands-button social-brands-twitter">
            <FontAwesomeIcon icon={faXTwitter} />
          </div>
        </Link>
      )}
    </div>
  );
}
