import { getBookedDatesByCabinId } from '@/app/_lib/data-service';

export async function GET({ request, params }) {
  const { cabinID } = params;

  try {
    const [cabin, bookedDates] = Promise.all(getCabin(cabinID), getBookedDatesByCabinId(cabinID));
    return Response.json({ cabin, bookedDates });
  } catch (err) {
    Response.json({ message: 'Cabin not found' });
  }
}

// export async function POST() {}
