import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
function Header() {
  return (
    <div>
      <ReactNavbar
        link1Text="Home"
        link2Text="Product"
        link3Text="About"
        link4Text="Contact"
      />
    </div>
  )
}

export default Header
