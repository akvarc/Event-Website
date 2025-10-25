import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';



function NewsletterSignup({...props}) {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form {...props}
      method="post"
      action="/newsletter"
      className="flex scale-80 justify-center"
    >
      <input className='border rounded-l-md  border-white p-0 text-center font-extralight'
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button className='bg-gray-600 p-1 rounded-r-md pr-2 hover:bg-stone-700'>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
