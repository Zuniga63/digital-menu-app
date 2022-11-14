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
          src={process.env.NEXT_PUBLIC_LOGO_URL || ''}
          alt="Digital Menu"
          width={640}
          height={640}
          layout="responsive"
        />
      </a>
    </Link>
  );
}
