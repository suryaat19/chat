export function Features() {
  const features = [
    { title: "User Authentication", description: "Verifies a person's identity, ensuring that only authorized users can access systems or data using credentials like passwords, biometrics, or tokens." },
    { title: "Real time Messaging", description: "Enables instant sending and receiving of messages with minimal delay for seamless communication." },
    { title: "Group and Direct Chats", description: "Supports conversations between multiple users in groups or one-on-one private messaging." },
    { title: "Rich Media Sharing", description: "Allows users to share images, videos, documents, and other multimedia within chat dialogs." },
    { title: "Clean Responsive Interface", description: "Adapts seamlessly across all device sizes by using flexible layouts, scalable images, and intuitive navigation to provide a consistent, user-friendly experience without clutter." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 px-4 py-4">
      {features.map((feature) => (
        <div 
          key={feature.title} 
          className="bg-white dark:bg-gray-800 rounded-lg ring md:shadow-xl shadow-sm px-6 py-4 ring-gray-900/5 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 h-full"
        >
          <h3 className="text-gray-900 dark:text-white mt-5 text-base font-bold tracking-tight">{feature.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}