import Link from "next/link";

export default function Home() {
  return (
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-col sm:flex-row items-center space-end gap-2 p-4 w-full h-16">
          <h1 className="text-indigo-500 text-4xl sm:text-3xl md:text-4xl font-bold px-4">Dummy Chat</h1>
          <div className="flex-grow"></div>
          <Link href="/authentication">
            <button className="btn btn-secondary focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 active:bg-indigo-700">Get Started</button>
          </Link>
        </div>
        <div className='sm:flex sm:flex-row flex flex-col mt-24'>
          <div>
            <p className="sm:text-8xl text-6xl sm:mx-16 mx-4">Join. Connect.</p>
            <p className="text-indigo-500 sm:text-8xl text-6xl sm:mx-16 mx-4">Communicate.</p>
          </div>
          <div className="chat chat-start ml-2 ">
            <div className="chat-image avatar">
                <div className="w-10 bg-blue-950 text-center text-3xl text-white rounded-full">
                  <img src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_auto,q_auto:best/rockcms/2022-03/220312-hailey-bieber-mjf-1403-2c7ede.jpg" />
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
        <span className="ml-16 dark:bg-gray-900 dark:text-white badge">User Authentication</span>
        <span className="ml-16 dark:bg-gray-900 dark:text-white badge">Real time Messaging</span>
        <span className="ml-16 dark:bg-gray-900 dark:text-white badge">Group and Direct Chats</span>
        <span className="ml-16 dark:bg-gray-900 dark:text-white badge">Rich Media Sharing</span>
        <span className="ml-16 dark:bg-gray-900 dark:text-white badge">Clean Responsive Interface</span>
      </div>
      
    </div>
  );
}
