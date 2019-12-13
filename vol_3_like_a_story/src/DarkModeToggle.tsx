import React from 'react'
import { RootState, RootActions } from './types'
import { toggleDarkMode } from './actions'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = (state: RootState) => ({
  isDark: state.isDarkMode
})

const mapDispatch = (dispatch: Dispatch<RootActions>) => {
  return {
    toggle: () => dispatch(toggleDarkMode())
  }
}

type Props = ReturnType<typeof mapDispatch> & ReturnType<typeof mapStateToProps>

const DarkModeToggle: React.FC<Props> = props => {
  return (
    <div>
      <label>
        {props.isDark.toString()}
        <input type="checkbox" checked={props.isDark} onChange={props.toggle} />
      </label>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatch)(DarkModeToggle)
