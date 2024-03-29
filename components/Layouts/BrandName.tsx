import Link from 'next/link';

interface IBrandNameProps {
  onClick?: () => void;
}

export default function BrandName({ onClick }: IBrandNameProps) {
  return (
    <Link href="/">
      <a
        href=""
        className="m-0 block text-center font-display text-lg capitalize tracking-widest no-underline"
        onClick={onClick}
      >
        {process.env.NEXT_PUBLIC_APP_NAME || 'Digital'}
      </a>
    </Link>
  );
}
