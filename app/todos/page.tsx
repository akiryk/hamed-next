type Todo = {
  title: string
  id: number
}

const fetchTodos = async (): Promise<Todo[]> => {
  console.log(fetch)
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/')
  if (!res.ok) {
    throw new Error('failed to fetch todos')
  }
  return res.json()
}

export default async function Todos() {
  const todos = await fetchTodos()
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='txt-3xl font-bold'>Todos</h1>
        <ul className='mt-6 flex flex-col gap-3'>
          {todos.slice(0, 10).map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
