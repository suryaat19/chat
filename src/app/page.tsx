import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
   
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-col sm:flex-row items-center space-end gap-2 p-4 w-full h-16">
          <h1 className="text-indigo-500 text-4xl sm:text-3xl md:text-4xl font-bold px-4">Dummy Chat</h1>
          <div className="flex-grow"></div>
          <Link href="/authentication" className="tooltip tooltip-bottom" data-tip="Click to Login or Register">
            <button className=" btn btn-secondary focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:bg-indigo-700">Get Started</button>

          </Link>
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="forest" />
            <svg className="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg className="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
        <div className='sm:flex sm:flex-row flex flex-col mt-24'>
          <div>
            <p className="sm:text-8xl text-6xl sm:mx-16 mx-4">Join. Connect.</p>
            <p className="text-indigo-500 sm:text-8xl text-6xl sm:mx-16 mx-4">Communicate.</p>
          </div>
          <div className="chat chat-start ml-2 ">
            <div className="chat-image avatar">
                <div className="w-10 bg-blue-950 text-center text-3xl text-white rounded-full">
                  <Image alt="Image" src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_auto,q_auto:best/rockcms/2022-03/220312-hailey-bieber-mjf-1403-2c7ede.jpg"
                  width={40}
                  height={40}
                  />
                </div>
            </div>
            <div className="chat-header text-xl">Hailey<time className="text-xl opacity-50">22:47</time></div>
            <div className="chat-bubble text-white text-xl bg-blue-600">lets hangout this weekend</div>
            <div className="bg-red-400"></div>
            <div className="chat-footer text-xl opacity-50">
            <label className="swap">
              <input type="checkbox" />
              <svg className="swap-on size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="red" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
              <svg className="swap-off size-[1.5em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </label>
            Seen</div>
        </div>
        </div>
      <p className="text-2xl mx-16 mt-8">Dummy Chat is a simple chat application that allows you to connect with friends and family.</p>
      <div className="flex flex-col sm:flex-row mt-8 gap-3 sm:gap-0">
        <span className="ml-16 badge">User Authentication</span>
        <span className="ml-16 badge">Real time Messaging</span>
        <span className="ml-16 badge">Group and Direct Chats</span>
        <span className="ml-16 badge">Rich Media Sharing</span>
        <span className="ml-16 badge">Clean Responsive Interface</span>
      </div>
      
    </div>
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <aside>
        <div className="chat chat-start ml-2 ">
            <div className="chat-bubble text-white font-bold text-3xl bg-blue-600">Dummy Chat</div>
        </div>
        <p>
          Dummy Chat Ltd.<br/>
          Providing reliable connections since 2025
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Real time Messaging</a>
        <a className="link link-hover">Group and Direct Chats</a>
        <a className="link link-hover">Rich Media Sharing</a>
        <a className="link link-hover">Clean Responsive Interface</a>
      </nav>
      <nav>
        <h6 className="footer-title">Contributors</h6>
        <a className="link link-hover">Akanksha Gupta</a>
        <a className="link link-hover">Sameer Patel</a>
        <a className="link link-hover">Shreeja Chaudhary</a>
        <a className="link link-hover">Surya Thota</a>
      </nav>
    </footer>
  </>
  );
}
