import clientPromise from '@/lib/mongo/client'

let client
let db
let guestbook

async function init() {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db()
    guestbook = await db.collection('students')
  } catch (error) {
    throw new Error('Failed to connect to the database.')
  }
}

;(async () => {
  await init()
})()

/////////////////
/// Guestbook ///
////////////////

export const getGuestbookEntries = async () => {
  try {
    if (!guestbook) await init()

    console.log('fetching entries...')

    const entries = await guestbook
      .find({})
      .map(entry => ({ ...entry, _id: entry._id.toString() }))
      .toArray()
    return { entries }
  } catch (error) {
    return { error: 'Failed to fetch guestbook!' }
  }
}

export const createGuestbookEntry = async ({ firstName, lastName, age }) => {
  try {
    if (!guestbook) await init()

    return await guestbook.insertOne({
      firstName,
      lastName,
      age,
      updatedAt: new Date()
    })
  } catch (error) {
    return { error: 'Failed to create entry!' }
  }
}
