import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>© {new Date().getFullYear()} Sitecore Demo Solutions.</p>
        <p>
          Powered by{' '}
          <Image
            src="/assets/blog/shared/content-hub-one-logo.svg"
            width={134}
            height={26}
            alt={'Content Hub ONE'}
          />
        </p>
      </div>
    </footer>
  );
}
