// Note: This is the mobile navigation control.
// For desktop navigation, see NavBar
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IconAccountWhite, IconWatchlistWhite, IconHomeBlack, IconLogoWhite, IconMenuWhite, IconSearchWhite, IconSettingsBlack, IconTradeNexusBlack, IconMessageHubBlack, IconLogoutWhite, IconLoginWhite } from '../../../shared/icons';
import classes from './FooterBar.module.scss';
import { useEffect, useState } from "react";
import { selectIsLoggedIn } from '../../../app/slices/loginSlice';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../../app/api/authenticationApi';
import { useAccountSummary } from '../../../app/hooks';
import { focusHandler } from '../../../utils/accessibilityUtil';

interface BarItem {
  name: string,
  icon: any,
  link: string,
  className?: string,
  number?: number,
  onClick?: (dispatch: any) => {},
  setExpanded?: (isExpanded: boolean) => void,
  siteLocation?: string,
  isAdditionalActiveRoute?: (location: string) => boolean
}

const alwaysActive = (props: any) => `${classes.active} clean`;
const flagActive = (props: { isActive: boolean, isPending: boolean }): string =>
  (props.isActive ? classes.active : '') + ' clean';

const NavBarItem = (props: BarItem) => {
  return <NavLink
    to={props.link}
    className={props.isAdditionalActiveRoute?.(props.siteLocation ?? '') ? alwaysActive : flagActive}
    onClick={props.onClick}
    aria-current
  >
    <div
      className={`${classes.menuItem} ${props.className ? props.className : ''}`}
      onClick={() => props.setExpanded!(false)}
    >
      <div className={classes.menuIcon}>
        {
          props.number! > 0 &&
          <div className={classes.menuIconNumber}>{props.number}</div>
        }
        {props.icon}
      </div>
      <div className={classes.menuText}>{props.name}</div>
    </div>
  </NavLink>;
}

const logoutItem: BarItem = {
  name: "Logout",
  icon: IconLogoutWhite,
  link: "/login",
}

const messageHubItem: BarItem = {
  name: 'Message Hub',
  icon: IconMessageHubBlack,
  link: '/message-hub',
  isAdditionalActiveRoute: (location: string) => (
    location.startsWith('/new-message')
  )
}

const footerBarItemsAuthenticated: BarItem[] = [
  {
    name: 'Home',
    icon: IconHomeBlack,
    link: '/'
  },
  {
    name: 'Search',
    icon: IconSearchWhite,
    link: '/search',
    className: classes.menuSearch
  },
  {
    name: 'Watchlist',
    icon: IconWatchlistWhite,
    link: '/watchlist'
  },
  {
    name: 'Trade Nexus',
    icon: IconTradeNexusBlack,
    link: '/trade-nexus',
    isAdditionalActiveRoute: (location: string) => (
      location.indexOf('trade') > -1 || location.indexOf('instrument') > -1
    )
  },
  messageHubItem,
  {
    name: 'Account',
    icon: IconAccountWhite,
    link: '/account',
    isAdditionalActiveRoute: (location: string) => (
      location.startsWith('/deposit-funds')
      || location.startsWith('/withdraw-funds')
    )
  },
  {
    name: 'Settings',
    icon: IconSettingsBlack,
    link: '/settings',
    isAdditionalActiveRoute: (location: string) => (
      location.startsWith('/change-password')
      || location.startsWith('/change-email')
      || location.startsWith('/update-address')
    )
  },
  logoutItem
];

const footerBarItemsUnauthenticated: BarItem[] = [
  {
    name: 'Login',
    icon: IconLoginWhite,
    link: '/login'
  }
]

const FooterBar = () => {
  const location = useLocation();
  const [isExpanded, setExpanded] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [attemptLogout, logoutResult] = useLogoutMutation();
  const accountSummary = useAccountSummary();

  const items = isLoggedIn ? footerBarItemsAuthenticated : footerBarItemsUnauthenticated;
  // Patch LogOut pathway to use the useLogOut method
  logoutItem.onClick = attemptLogout;
  if (accountSummary != null) {
    messageHubItem.number = accountSummary.unreadMessages;
  }

  // Effect to ensure that underlying content doesn't scroll while menu is open
  useEffect(() => {
    if (isExpanded == false)
      return;

    const html = document.querySelector('html');
    let hasRemoved = false;
    const closeFooter = () => {
      if (hasRemoved)
        return;

      hasRemoved = true;
      html!.removeEventListener('click', closeFooter);
      (html as any).style.overflow = null;
      setExpanded(false);
    };
    html!.style.overflow = 'hidden';
    html!.addEventListener('click', closeFooter, { once: true });

    return closeFooter;
  }, [isExpanded]);

  return <>
    <nav className={classes.footerBar}>
      <NavLink to={'/search'}>
        <div className={`${classes.search} ${classes.bottomIcon}`}>
          {IconSearchWhite}
        </div>
      </NavLink>
      <NavLink to={'/'}>
        <div className={classes.bottomIcon}>
          {IconHomeBlack}
        </div>
      </NavLink>
      <div
        onKeyUp={focusHandler}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setExpanded(!isExpanded);
        }}
        tabIndex={0}
        role="navigation"
        aria-label="Main Navigation Menu"
        aria-pressed={isExpanded}
        className={classes.menuIcon}
      >
        {IconMenuWhite}
      </div>
    </nav>

    <div
      aria-hidden={!isExpanded}
      className={`${classes.popup} ${isExpanded ? classes.expanded : classes.collapsed}`}
    >
      {
        items.map(item => <NavBarItem {...item} key={item.name} setExpanded={setExpanded} siteLocation={location.pathname} />
        )
      }
    </div>
  </>
}

export default FooterBar;