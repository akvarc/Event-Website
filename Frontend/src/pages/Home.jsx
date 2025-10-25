import PageContent from "../components/PageContent";

function HomePage() {
  return (
    
      <section className=" pt-24 flex flex-col justify-center items-center text-center ">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-6">
          Welcome to Events!
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl">
          Discover and stay updated with all our exciting events. Browse upcoming
          activities, read our latest newsletters, and stay in the loop with everything
          happening in our community.
        </p>

        <ul className="text-gray-200 text-center md:text-center space-y-3 mb-6 max-w-xl ">
          <li>✨ <span className="font-semibold">For Guests:</span> View all events and newsletters without signing in.</li>
          <li>🔑 <span className="font-semibold">For Members:</span> Sign up or log in to create, edit, or delete events, and enjoy full access to all features.</li>
        </ul>

        <p className="text-amber-400 font-medium text-lg md:text-xl">
          Join us today and be part of the experience!
        </p>
      </section>
   
  );
}

export default HomePage;
