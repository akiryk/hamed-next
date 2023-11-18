import { NextResponse } from 'next/server';
import {
  createGuestbookEntry,
  getGuestbookEntries
} from '@/lib/mongo/guestbook';

export async function GET() {
  console.log('At GET');
  try {
    const { entries, error } = await getGuestbookEntries();
    if (error) throw new Error(error);

    return NextResponse.json({ entries }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    console.log('at POST');
    const { firstName, lastName, age } = await request.json();

    const { insertedId, error } = await createGuestbookEntry({
      firstName,
      lastName,
      age
    });
    if (error) throw new Error(error);

    return NextResponse.json({ insertedId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
