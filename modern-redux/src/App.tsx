import { useState } from 'react'
import { useFetchPostsQuery } from './features/posts/postApiSlice'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { amountAdded, incremented } from './features/counter/counterSlice'
import './App.css'

function App() {
  // const count = useAppSelector((state) => state.counter.value)
  // const dispatch = useAppDispatch();
  const [numPosts, setNumPosts] = useState(10)
  const { data = [], isFetching } = useFetchPostsQuery(numPosts);

  return (
    <div className="App">
      <header className="App-header">
        {/*   <p>
          <button type="button" onClick={() => dispatch(amountAdded(2))}>
            count is: {count}
          </button>
        </p> */}
        <div>
          <p>Select number of posts to fetch</p>
          <select value={numPosts} onChange={(e) => setNumPosts(Number(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div>
          <p>Number of posts fetched: {data.length}</p>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {data.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.body.slice(0, 20) + "..."}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  )
}

export default App
