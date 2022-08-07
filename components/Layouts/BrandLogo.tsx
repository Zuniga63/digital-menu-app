import Link from 'next/link';
import Image from 'next/image';

interface IBrandLogoProps {
  onClick?: () => void;
}

export default function BrandLogo({ onClick }: IBrandLogoProps) {
  return (
    <Link href="/" passHref>
      <a href="" className="relative block w-10 overflow-hidden" onClick={onClick}>
        <Image
          src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Digital+Menu"
          alt="Digital Menu"
          width={48}
          height={48}
          layout="responsive"
        />
      </a>
    </Link>
  );
}
