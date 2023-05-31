import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container, Logo, Main, RightSide, MenuButton, MenuOptions, VerticalMenu, Buttons } from './styles'
import Search from '../SearchBar'
import UserButton from '../Buttons/User'
import MenuIcon from '@material-ui/icons/Menu'

function Navbar() {
  const menuRef = useRef()
  const profileMenuRef = useRef()
  const [showMenu, setShowMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    window.addEventListener('mousedown', handleClick)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousedown', handleClick)
      window.removeEventListener('scroll', handleScroll)
    }
  })

  function handleScroll() {
    if ((opacity === 0) && (window.scrollY > 10)) {
      setOpacity(1)
    } else if ((opacity === 1) && (window.scrollY < 10)) {
      setOpacity(0)
    }
  }

  function handleClick(event) {
    if (showMenu && !menuRef.current.contains(event.target)) {
      setShowMenu(false)
    }
    if (showProfileMenu && !profileMenuRef.current.contains(event.target)) {
      setShowProfileMenu(false)
    }
  }

  function drawMenuOptions() {
    return (
      <>
        <Link to='/'>Home</Link>
        <Link to='/'>My List</Link>
      </>
    )
  }

  function toggleProfileMenu() {
    setShowProfileMenu(!showProfileMenu)
  }

  return (
    <Container opacity={opacity}>
      <Main>
        <div ref={menuRef}>
          <MenuButton onClick={() => setShowMenu(!showMenu)}>
            <MenuIcon style={{ fontSize: 'max(2rem, 2vw)' }} />
          </MenuButton>
          <MenuOptions hide={!showMenu}>
            <section>
              <Link to='/'>Account</Link>
              <Link to='/'>Help Center</Link>
              <Link to='/'>Sign out</Link>
            </section>
            <section>
              {drawMenuOptions()}
            </section>
          </MenuOptions>
        </div>
        <Logo to='/' title='AnimeHub'>
          <span style={{ color: '#e50914', fontSize: '2rem', fontWeight: 'bold', marginLeft: '1rem' }}>ANIMEHUB</span>
        </Logo>
        <VerticalMenu>{drawMenuOptions()}</VerticalMenu>
      </Main>
      <RightSide>
        <Search />
        <Buttons>
          <div ref={profileMenuRef}>
            <UserButton onClick={toggleProfileMenu} active={showProfileMenu} />
            {showProfileMenu && (
              <div>
                <Link to='/profile'>My Profile</Link>
                <Link to='/logout'>Logout</Link>
              </div>
            )}
          </div>
        </Buttons>
      </RightSide>
    </Container>
  )
}

export default Navbar
