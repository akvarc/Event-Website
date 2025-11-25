import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  redirect
} from 'react-router-dom';

// import classes from './EventForm.module.css';
import { getAuthToken } from '../util/auth';

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form
  method={method}
  className="max-w-lg mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6 mt-20 text-amber-50"
>
  {data && data.errors && (
    <ul className="bg-red-700 bg-opacity-30 p-3 rounded space-y-1 text-red-200">
      {Object.values(data.errors).map((err) => (
        <li key={err} className="text-sm">
          {err}
        </li>
      ))}
    </ul>
  )}

  <p className="flex flex-col">
    <label htmlFor="title" className="mb-1 font-semibold">
      Title
    </label>
    <input
      id="title"
      type="text"
      name="title"
      required
      defaultValue={event ? event.title : ''}
      className="rounded-lg px-4 py-2 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
  </p>

  <p className="flex flex-col">
    <label htmlFor="image" className="mb-1 font-semibold">
      Image
    </label>
    <input
      id="image"
      type="url"
      name="image"
      required
      defaultValue={event ? event.image : ''}
      className="rounded-lg px-4 py-2 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
  </p>

  <p className="flex flex-col">
    <label htmlFor="date" className="mb-1 font-semibold">
      Date
    </label>
    <input
      id="date"
      type="date"
      name="date"
      required
      defaultValue={event ? event.date : ''}
      className="rounded-lg px-4 py-2 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
    />
  </p>

  <p className="flex flex-col">
    <label htmlFor="description" className="mb-1 font-semibold">
      Description
    </label>
    <textarea
      id="description"
      name="description"
      rows="5"
      required
      defaultValue={event ? event.description : ''}
      className="rounded-lg px-4 py-2 bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
    />
  </p>

  <div className="flex justify-between mt-4">
    <button
      type="button"
      onClick={cancelHandler}
      disabled={isSubmitting}
      className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-full font-semibold transition"
    >
      Cancel
    </button>
    <button
      disabled={isSubmitting}
      className="px-6 py-2 bg-amber-400 hover:bg-amber-500 rounded-md font-semibold text-white transition"
    >
      {isSubmitting ? 'Submitting...' : 'Save'}
    </button>
  </div>
</Form>

  );
}

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  let url = 'https://event-website-qys3.onrender.com/events';

  if (method === 'PATCH') {
    const eventId = params.eventId;
    url = 'https://event-website-qys3.onrender.com/events/' + eventId;
  }
 const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + token
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save event.' }), { status: 500 });
  }

  return redirect('/events');
}

