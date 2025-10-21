import Link from 'next/link';
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer sm:footer-horizontal dark:bg-gray-800 text-base-content p-10">
      <aside>
        <div className="flex items-center justify-between gap-15">
          <Logo className="size-25 shrink-0" />
        </div>
        <p className="text-gray-900 dark:text-white text-base font-medium">
          Dummy Chat Ltd.<br />
          Providing reliable connections since 2025
        </p>
      </aside>
      <nav>
        <h6 className="text-gray-900 dark:text-white text-base font-medium">Services</h6>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Real time Messaging</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Group and Direct Chats</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Rich Media Sharing</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Clean Responsive Interface</p>
      </nav>
      <nav>
        <h6 className="text-gray-900 dark:text-white text-base font-medium">Contributors</h6>
        <a className="link link-hover text-gray-500 dark:text-gray-400 text-sm" href="https://www.linkedin.com/in/akanksha-gupta-a9241028b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Akanksha Gupta</a>
        <a className="link link-hover text-gray-500 dark:text-gray-400 text-sm" href="https://www.linkedin.com/in/sameer-patel-ba715928b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Sameer Patel</a>
        <a className="link link-hover text-gray-500 dark:text-gray-400 text-sm">Shreeja Chaudhary</a>
        <a className="link link-hover text-gray-500 dark:text-gray-400 text-sm" href="https://www.linkedin.com/in/surya-thota21">Surya Thota</a>
      </nav>
    </footer>
  );
}