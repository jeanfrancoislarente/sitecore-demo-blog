import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';
import { faFacebookF, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

type SocialShareProps = {
  url: string;
  title: string;
};

export default function SocialShare({ url, title }: SocialShareProps) {
  return (
    <div className="social-share">
      <FacebookShareButton url={url} quote={title} className="social-share-facebook">
        <div className="social-share-button">
          <FontAwesomeIcon icon={faFacebookF} />
        </div>
      </FacebookShareButton>
      <LinkedinShareButton url={url} className="social-share-linkedin">
        <div className="social-share-button">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </div>
      </LinkedinShareButton>
      <TwitterShareButton url={url} title={title} className="social-share-twitter">
        <div className="social-share-button">
          <FontAwesomeIcon icon={faXTwitter} />
        </div>
      </TwitterShareButton>
    </div>
  );
}
