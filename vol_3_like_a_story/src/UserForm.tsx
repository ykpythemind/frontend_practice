import { bindActionCreators, Dispatch } from 'redux'
import { RootActions } from './types'
import { addUser } from './actions'
import React from 'react'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => {
  return bindActionCreators(
    {
      addUser: addUser
    },
    dispatch
  )
}

type Props = ReturnType<typeof mapDispatchToProps>

const UserForm: React.FC<Props> = props => {
  const { addUser } = props
  let input: HTMLInputElement

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          console.log(e)
          if (!input.value.trim()) {
            return
          }
          console.log(input.value)
          addUser(input.value)
          input.value = ''
        }}
      >
        <input ref={node => (input = node as HTMLInputElement)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(UserForm)
