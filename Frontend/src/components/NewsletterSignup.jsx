import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

function NewsletterSignup({ ...props }) {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      {...props}
      method="post"
      action="/newsletter"
      className="w-full flex justify-center mt-6 px-4"
    >
      <div className="flex w-full max-w-lg bg-neutral-800 rounded-xl border border-neutral-700 shadow-lg overflow-hidden">
        <input
          type="email"
          placeholder="Join our newsletter..."
          aria-label="Sign up for newsletter"
          className="flex-1 bg-neutral-800 text-white placeholder-gray-400 px-4 py-3 focus:outline-none"
        />

        <button
          className="bg-yellow-400 text-black font-semibold px-5 py-3 hover:bg-yellow-500 transition-all"
        >
          Join
        </button>
      </div>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
