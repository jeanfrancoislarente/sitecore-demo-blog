import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { faFacebookF, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

type SocialShareProps = {
  url: string;
  title: string;
};

export default function SocialShare({ url, title }: SocialShareProps) {
  return (
    <div className="social-brands">
      <FacebookShareButton url={url} quote={title}>
        <div className="social-brands-button social-brands-facebook">
          <FontAwesomeIcon icon={faFacebookF} />
        </div>
      </FacebookShareButton>
      <LinkedinShareButton url={url}>
        <div className="social-brands-button social-brands-linkedin">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </div>
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={title}>
        <div className="social-brands-button social-brands-twitter">
          <FontAwesomeIcon icon={faXTwitter} />
        </div>
      </TwitterShareButton>
    </div>
  );
}
