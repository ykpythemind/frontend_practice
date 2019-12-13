import React from 'react'
import UserForm from './UserForm'
import UserList from './UserList'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header"></header>
      <UserForm />
      <br />
      <UserList />
    </div>
  )
}

export default App
