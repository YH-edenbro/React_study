import './App.css'
import { useState, useRef, useReducer } from 'react'
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'

const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'React 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: '빨래하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '노래 연습하기',
    date: new Date().getTime(),
  },
    ]

function reducer(state, action) {
  switch(action.type){
    case "CREATE": 
      return [action.data, ...state]
    case "UPDATE":
      return state.map((item) => item.id === action.targetID? {...item, isDone: !item.isDone} : item)
    case "DELETE":
      return state.filter((item) => item.id !== action.targetID)
    default:
      return state
  }

}

function App() {

  const [todos, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(3)

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data : {
        id: idRef.current ++,
        isDone: false,
        content: content,
        data: new Date().getTime(),
      }
    })
  }

  const onUpdate = (targetID) => {
    dispatch({
      type: "UPDATE",
      targetID: targetID
    })

  }

  const onDelete = (targetID) => {
    dispatch({
      type: "DELETE",
      targetID: targetID
    })
  }

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate}/>
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  )
}

export default App
