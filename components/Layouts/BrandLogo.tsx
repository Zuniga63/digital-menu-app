import Link from 'next/link';
import Image from 'next/image';

interface IBrandLogoProps {
  onClick?: () => void;
}

export default function BrandLogo({ onClick }: IBrandLogoProps) {
  return (
    <Link href="/">
      <a
        href=""
        className="relative block w-12 overflow-hidden rounded-full"
        onClick={onClick}
      >
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
