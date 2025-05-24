import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-xl space-x-3">
            <h1 className="text-5xl font-bold">Dummy Chat App</h1>
            <p className="py-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </p>
            <Link href="/authentication"><button className="btn btn-primary">Get Started</button></Link>
          </div>
        </div>
      </div>
    </>
  );
}
