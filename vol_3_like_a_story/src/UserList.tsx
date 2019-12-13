// import { bindActionCreators, Dispatch } from 'redux'
import { RootState, RootActions, User } from './types'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { startLoading, finishLoading, loadUser } from './actions'

const mapStateToProps = (state: RootState) => ({
  users: state.users,
  isLoading: state.isLoading
})

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => {
  return bindActionCreators(
    {
      startLoading,
      finishLoading,
      loadUser
    },
    dispatch
  )
}

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

class UserList extends React.Component<Props> {
  async componentDidMount() {
    this.props.startLoading()

    // API問い合わせのシミュレーション
    await timeout(1000)
    const users: User[] = [{ name: 'fuga' }, { name: 'hoge' }, { name: 'piyo' }]
    this.props.loadUser(users)

    this.props.finishLoading()
  }

  render() {
    return (
      <div>
        {this.props.isLoading ? 'loading...' : ''}
        <ol>
          {this.props.users.map(u => {
            return <li>{u.name}</li>
          })}
        </ol>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
