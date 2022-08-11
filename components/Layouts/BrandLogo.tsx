import Link from 'next/link';
import Image from 'next/image';

interface IBrandLogoProps {
  onClick?: () => void;
}

export default function BrandLogo({ onClick }: IBrandLogoProps) {
  return (
    <Link href="/" passHref>
      <a href="" className="relative block w-14 overflow-hidden" onClick={onClick}>
        <Image
          src="https://res.cloudinary.com/dr8snppzz/image/upload/v1660154188/digital-menu/logo_zby22a.png"
          alt="Digital Menu"
          width={640}
          height={640}
          layout="responsive"
        />
      </a>
    </Link>
  );
}
