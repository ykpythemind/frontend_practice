// import { bindActionCreators, Dispatch } from 'redux'
import { RootState } from './types'
import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state: RootState) => ({
  users: state.users
})

type Props = ReturnType<typeof mapStateToProps> // & ReturnType<typeof mapDispatchToProps>

class UserList extends React.Component<Props> {
  render() {
    return (
      <ol>
        {this.props.users.map(u => {
          return <li>{u.name}</li>
        })}
      </ol>
    )
  }
}

export default connect(mapStateToProps)(UserList)
