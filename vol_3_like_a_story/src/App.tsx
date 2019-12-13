import React from 'react'
import UserForm from './UserForm'
import UserList from './UserList'
import DarkModeToggle from './DarkModeToggle'

import { RootState } from './types'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header"></header>
      <UserForm />
      <br />
      <UserList />
      <br />
      <DarkModeToggle />
    </div>
  )
}

export default App
