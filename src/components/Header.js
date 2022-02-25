import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
const Header = ({onShowAdd,onShow}) => {

  
  
    return (
    <header className='header'>
  
  <h1>Task Tracker</h1>
   <Button 
   color={onShow ? 'red' : 'green'}
   text={onShow ? 'Close' : 'Add'}
   onClick={onShowAdd}
   />
    </header>
  )
}

Header.defaultProps = {
    title:'Task Tracker'
}

// Header.propTypes  = {
//   title: PropTypes.string
// }
export default Header