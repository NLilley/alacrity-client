// Note: This is the desktop navigation control.
// For mobile navigation, see FooterBar

import { NavLink, useLocation } from 'react-router-dom';
import { IconAccountWhite, IconTradeNexusBlack, IconWatchlistWhite, IconHomeBlack, IconLogoWhite, IconMessageHubBlack, IconSearchWhite, IconSettingsBlack, IconLoginWhite, IconLogoutWhite } from '../../../shared/icons';
import classes from './NavBar.module.scss';
import { SyntheticEvent, useEffect, useState } from 'react';
import { selectIsLoggedIn } from '../../../app/slices/loginSlice';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../../app/api/authenticationApi';
import { useAccountSummary } from '../../../app/hooks';
import { focusHandler } from '../../../utils/accessibilityUtil';

interface BarIcon {
  name: string,
  icon: any,
  link: string,
  className?: string,
  number?: number,
  onClick?: (dispatch: any) => {},
  siteLocation?: string,
  isAdditionalActiveRoute?: (location: string) => boolean
}

const alwaysActive = (props: { isActive: boolean, isPending: boolean }) => `${classes.active} clean`;
const flagActive = (props: { isActive: boolean, isPending: boolean }): string =>
  `${(props.isActive ? classes.active : '')} clean`;

const NavBarItem = (props: BarIcon) => {
  return <NavLink
    to={props.link}
    className={props.isAdditionalActiveRoute?.(props.siteLocation ?? '') ? alwaysActive : flagActive}
    onClick={props.onClick}
    aria-current
  >
    <div className={`${classes.navBarTopItem}`}>
      <div className={`${classes.icon} ${props.className}`}>
        {
          props.number! > 0 &&
          <div className={classes.iconNumber}>{props.number}</div>
        }
        {props.icon}
      </div>
      <div className={`${classes.text}`}>
        {props.name}
      </div>
    </div>
  </NavLink>;
}

const messageHubIcon: BarIcon = {
  name: 'Message Hub',
  className: classes.iconHome,
  icon: IconMessageHubBlack,
  link: '/message-hub',
  isAdditionalActiveRoute: (location: string) => (
    location.startsWith('/new-message')
  )
};
const topNavBarIconsAuthenticated: BarIcon[] = [
  {
    name: 'Home',
    className: classes.iconHome,
    icon: IconHomeBlack,
    link: '/'
  },
  {
    name: 'Trade Nexus',
    className: classes.iconHome,
    icon: IconTradeNexusBlack,
    link: '/trade-nexus',
    isAdditionalActiveRoute: (location: string) => (
      location.indexOf('trade') > -1 || location.indexOf('instrument') > -1
    )
  },
  {
    name: 'Search',
    className: classes.iconSearch,
    icon: IconSearchWhite,
    link: '/search'
  },
  {
    name: 'Watchlist',
    className: classes.iconWatchlist,
    icon: IconWatchlistWhite,
    link: '/watchlist'
  },
  messageHubIcon
];

const logoutIcon: BarIcon =
{
  name: 'Logout',
  className: classes.iconLogout,
  icon: IconLogoutWhite,
  link: '/login',
};
const bottomBarNavIconsAuthenticated: BarIcon[] = [
  {
    name: 'Settings',
    className: classes.iconSettings,
    icon: IconSettingsBlack,
    link: '/settings',
    isAdditionalActiveRoute: (location: string) => (
      location.startsWith('/change-password')
      || location.startsWith('/change-email')
      || location.startsWith('/update-address')
    )
  },
  {
    name: 'Account',
    className: classes.iconAccount,
    icon: IconAccountWhite,
    link: '/account',
    isAdditionalActiveRoute: (location: string) => (
      location.startsWith('/deposit-funds')
      || location.startsWith('/withdraw-funds')
    )
  },
  logoutIcon
];

const bottomBarNavIconsUnauthneticated: BarIcon[] = [
  {
    name: 'Login',
    className: classes.iconSettings,
    icon: IconLoginWhite,
    link: '/'
  }
]

const NavBar = () => {
  const location = useLocation();
  const [isExpanded, setExpanded] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [attemptLogout, logoutResult] = useLogoutMutation();
  const accountSummary = useAccountSummary();

  const navBarTopIcons = isLoggedIn ? topNavBarIconsAuthenticated : [];
  const navBarBottomIcons = isLoggedIn ? bottomBarNavIconsAuthenticated : bottomBarNavIconsUnauthneticated;

  // Patch LogOut pathway to use the useLogOut method
  logoutIcon.onClick = attemptLogout;

  if (accountSummary != null) {
    messageHubIcon.number = accountSummary.unreadMessages;
  }

  // Effect to ensure navbar closes when the user clicks onto the main content
  useEffect(() => {
    if (!isExpanded)
      return;

    const mainContent = document.querySelector("html");
    const closeSidePanel = () => setExpanded(false);
    mainContent?.addEventListener('click', closeSidePanel, { once: true });

    return () => mainContent?.removeEventListener('click', closeSidePanel);
  }, [isExpanded])

  return <nav className={`${classes.navBar} ${isExpanded ? classes.expanded : ''}`}>
    {/* Nav Bar Header */}
    <div
      className={classes.navBarHeader}
      onClick={(e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setExpanded(!isExpanded);
      }}
      onKeyUp={focusHandler}
      tabIndex={0}
      role="button"
      aria-pressed={isExpanded}
    >
      <div className={classes.icon}>
        <span className={classes.iconLogo}>
          {IconLogoWhite}
          {/* Max */}
        </span>
      </div>
      <div className={classes.text}>
        Alacrity
      </div>
    </div>

    {/* Nav Bar Top */}
    <div className={classes.navBarTop} style={{ marginTop: '5vh' }}>
      {navBarTopIcons.map(item => <NavBarItem {...item} key={item.name} siteLocation={location.pathname} />)}
    </div>

    {/* Nav Bar Bottom */}
    <div className={classes.navBarBottom}>
      {navBarBottomIcons.map(item => <NavBarItem {...item} key={item.name} siteLocation={location.pathname} />)}
    </div>
  </nav>
};
export default NavBar;