import { Suspense } from 'react';
import {
  useRouteLoaderData,
  redirect,
  Await,
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { getAuthToken } from '../util/auth';

function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
    <div>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <div ><Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await></div>
      </Suspense>
      <Suspense fallback={<p className="text-center text-gray-500 py-8" style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
      </div>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch('https://event-website-25up.onrender.com' + id);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch details for selected event.' })
      ,
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch('https://event-website-25up.onrender.com');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' })
      ,
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return ({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const token = getAuthToken();
  const response = await fetch('https://event-website-25up.onrender.com' + eventId, {
    method: request.method,
    headers:{
      'Authorization':'Bearer ' + token
    }
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete event.' })
      ,
      {
        status: 500,
      }
    );
  }
  return redirect('/events');
}
