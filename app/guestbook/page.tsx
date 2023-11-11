import { getGuestbookEntries } from '@/lib/mongo/guestbook'

const getData = async () => {
  const { entries, error } = await getGuestbookEntries()

  if (!entries || error) {
    throw new Error('Failed to fetch entries')
  }

  return entries
}

type Student = {
  firstName: string
  lastName: string
  age: number
  _id: string
}

export default async function Guestbook() {
  const entries: Array<Student> = await getData()
  return (
    <section className='py-24'>
      <div className='container'>
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
  )
}
