import './List.css'
import TodoItem from './TodoItem'
import { useState, useMemo } from 'react'

const List = ({todos, onUpdate, onDelete}) => {

  const [search, setSearch] = useState('')

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const getFilterdData = () => {
    if(search === '') {
      return todos
    }
    return todos.filter((todo) => 
      todo.content.toLowerCase().includes(search.toLowerCase())
    )
  }

  const filterdTodos = getFilterdData()

  const {totalCount, doneCount, notDoneCount} = 
    useMemo(()=> {
      const totalCount = todos.length
      const doneCount = todos.filter((todo) => (todo.isDone)).length
      const notDoneCount = totalCount - doneCount

      return {
        totalCount,
        doneCount,
        notDoneCount,
      }
   }, [todos])

  // 의존성배열 : deps

  // const {totalCount, doneCount, notDoneCount} = getAnalyzeData()

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done : {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>
      <input value={search} onChange={onChangeSearch} placeholder="검색어를 입력하세요"/>
      <div className='todos_wrapper'>
        {filterdTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete}/>
        })}
      </div>
    </div>
  )
}

export default List