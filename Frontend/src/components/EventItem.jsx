import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
  const token = useRouteLoaderData('root');
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <article className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-2xl shadow-gray-800 overflow-hidden text-amber-50">
        <div className="w-full h-80 md:h-96 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
        </div>
        <div className="p-8 flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
          <time className="text-gray-400">{event.date}</time>
          <p className="text-gray-200">{event.description}</p>
  
          {token && (
            <div className="flex gap-4 mt-4">
              <Link
                to="edit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-full text-white font-semibold transition"
              >
                Edit
              </Link>
              <button
                onClick={startDeleteHandler}
                className="px-4 py-2 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white rounded-full font-semibold transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}


export default EventItem;
