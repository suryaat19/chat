import Link from 'next/link';

const Logo = ({ className }: { className?: string }) => (
  <svg className={className || "size-15 shrink-0"} viewBox="0 0 40 40">
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a">
          <stop stopColor="#5C5CFF" offset="0%"></stop>
          <stop stopColor="#8A8AFF" offset="100%"></stop>
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b">
          <stop stopColor="#5C5CFF" offset="0%"></stop>
          <stop stopColor="#8A8AFF" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          d="M28.872 22.096c.084.622.128 1.258.128 1.904 0 7.732-6.268 14-14 14-2.176 0-4.236-.496-6.073-1.382l-6.022 2.007c-1.564.521-3.051-.966-2.53-2.53l2.007-6.022A13.944 13.944 0 0 1 1 24c0-7.331 5.635-13.346 12.81-13.95A9.967 9.967 0 0 0 13 14c0 5.523 4.477 10 10 10a9.955 9.955 0 0 0 5.872-1.904z"
          fill="url(#a)"
          transform="translate(1 1)"
        ></path>
        <path
          d="M35.618 20.073l2.007 6.022c.521 1.564-.966 3.051-2.53 2.53l-6.022-2.007A13.944 13.944 0 0 1 23 28c-7.732 0-14-6.268-14-14S15.268 0 23 0s14 6.268 14 14c0 2.176-.496 4.236-1.382 6.073z"
          fill="url(#b)"
          transform="translate(1 1)"
        ></path>
        <path
          d="M18 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM24 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM30 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
          fill="#FFF"
        ></path>
      </g>
    </svg>
);

export function Header() {
  return (
    <header className="flex md:justify-between justify-center p-[2%] pt-5 h-[10%]">
      <Link href="/" aria-label="Dummy Chat Home" className="flex items-center gap-4">
        <Logo className="size-15 shrink-0" />
        <p className="text-4xl font-bold font-mono dark:text-white">
          Dummy Chat
        </p>
      </Link>
    </header>
  );
}