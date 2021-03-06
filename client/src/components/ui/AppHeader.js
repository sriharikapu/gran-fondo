import React from 'react'
import { Flex, Box } from 'rebass'
import styled, { withTheme } from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { shadeColor } from '../../lib/helpers'
import Button from '../../components/ui/Button'

import Logo from '../../assets/images/gran-fondo-logo.png'

const LinkStyled = styled(Link)`
  color: ${({ theme }) => theme.colors.grayDarker};
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.25s ease;
  font-family: 'Metropolis Semi Bold';

  &:hover {
    color: ${({ theme }) => shadeColor(theme.colors.grayDarker, -0.7)};
  }
`

const MenuLink = ({ to, text }) => (
  <Box mx={3}>
    <LinkStyled to={to}>{text}</LinkStyled>
  </Box>
)

const AppHeader = ({ theme, history, loggedIn }) => (
  <div
    style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: theme.colors.lightYellow,
      boxShadow: '0px 10px 24px rgba(0,0,0,0.05)'
    }}
  >
    <Flex
      p={theme.uiGlobal.appHeaderLogoMargin}
      alignItems='center'
      justifyContent='space-between'
      px={theme.uiGlobal.appLayoutMargin}
      style={{
        width: '100%'
      }}
    >
      <Flex>
        <Box>
          <img
            src={Logo}
            alt={Logo}
            style={{
              float: 'left',
              height: `${theme.uiGlobal.appHeaderLogoHeight}px`,
              width: 'auto'
            }}
          />
        </Box>
        {loggedIn && (
          <Flex ml={3} alignItems='center' justifyContent='center'>
            <MenuLink to='/' text='Challenges' />
            <MenuLink to='/user' text='User' />
          </Flex>
        )}
      </Flex>
      {loggedIn && (
        <Box>
          <Button
            type='secondary'
            isRounded
            onClick={() => history.push('/create')}
            style={{ padding: `${theme.space[4]}px ${theme.space[5]}px` }}
          >
            New Challenge
          </Button>
        </Box>
      )}
    </Flex>
  </div>
)

AppHeader.defaultProps = {
  children: null,
  loggedIn: false
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
})

export default connect(mapStateToProps)(withTheme(AppHeader))
