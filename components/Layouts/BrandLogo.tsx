import Link from 'next/link';
import Image from 'next/image';

interface IBrandLogoProps {
  onClick?: () => void;
}

export default function BrandLogo({ onClick }: IBrandLogoProps) {
  return (
    <Link href="/" passHref>
      <a href="" className="relative block max-h-10 w-20 overflow-hidden" onClick={onClick}>
        <Image
          src="https://res.cloudinary.com/dr8snppzz/image/upload/v1660051714/digital-menu/menu_nv8vqt.png"
          alt="Digital Menu"
          width={900}
          height={300}
          layout="responsive"
        />
      </a>
    </Link>
  );
}
