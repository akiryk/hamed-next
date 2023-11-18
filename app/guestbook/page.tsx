import { cache } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/options';
import { getGuestbookEntries } from '@/lib/mongo/guestbook';
import GuestbookEntryForm from '@/app/components/GuestbookEntryForm';

// export the dynamic value to ensure page gets latest data
export const dynamic = 'force-dynamic';

// use `cache` when working with apis that don't directly use fetch
// because next automatically caches with fetch; not so with other apis
const getData = cache(async () => {
  const { entries, error } = await getGuestbookEntries();
  if (!entries || error) {
    throw new Error('Failed to fetch entries');
  }

  return entries;
});

type Student = {
  firstName: string;
  lastName: string;
  age: number;
  _id: string;
};

export default async function Guestbook() {
  const session = await getServerSession(authOptions);
  if (!session) {
    const callbackUrl = encodeURIComponent('/guestbook');
    redirect(`/signin?callbackUrl=${callbackUrl}`);
  }

  const entries: Array<Student> = await getData();
  return (
    <section className='py-24'>
      <div className='container'>
        <GuestbookEntryForm />

        <h1 className='txt-3xl font-bold'>Guest Book</h1>
        <ul className='mt-6 flex flex-col gap-3'>
          {entries.map(student => (
            <li
              key={student._id}
            >{`${student.firstName} ${student.lastName} is ${student.age}`}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
