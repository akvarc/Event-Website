import { Link } from "react-router-dom";

function EventsList({ events }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        All Events
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <li
            key={event.id}
            className=" bg-gray-800  rounded-xl  overflow-hidden  shadow-lg hover:scale-105  transition  cursor-pointer "
          >
            <Link to={`/events/${event.id}`}>
              {/* IMAGE */}
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="text-lg sm:text-xl font-semibold">
                  {event.title}
                </h2>
                <time className="text-sm text-gray-400">
                  {event.date}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
