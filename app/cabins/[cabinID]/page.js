import { getCabin, getCabins } from '@/app/_lib/data-service';
import { Suspense } from 'react';

import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';

export async function generateMetaData({ params }) {
  const { name } = await getCabin(params.cabinID);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map(cabin => ({ cabinID: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinID);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinID);

  // Shift + Alt + O

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />

      <div>
        <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
          Reserve {cabin.name}. Pay on arrival.
        </h2>
      </div>

      <Suspense
        fallback={<Spinner />}
        key={cabin}
      >
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
