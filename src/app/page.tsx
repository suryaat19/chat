import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <div className="flex items-center space-end gap-2 p-4 w-full h-16">
          <h1 className="text-indigo-500 text-3xl font-bold px-4">Dummy Chat</h1>
          <div className="flex-grow"></div>
          <Link href="/authentication">
            <button className="btn btn-secondary focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:bg-indigo-700">Get Started</button>
          </Link>
        </div>
        <div className='flex mt-24'> 
          <div>
            <p className="text-8xl mx-16 ">Join. Connect.</p>
            <p className="text-indigo-500 text-8xl mx-16">Communicate.</p>
          </div>
          <div className="flex justify-end">
            <img src="/img-1.png" alt="User 1" className="w-40 h-40" />
            <img src="/img-2.png" alt="User 2" className="w-12 h-12" />
          </div>
        </div>
      <p className="text-2xl mx-16 mt-8">Dummy Chat is a simple chat application that allows you to connect with friends and family.</p>
    </div>
    </>
  );
}
