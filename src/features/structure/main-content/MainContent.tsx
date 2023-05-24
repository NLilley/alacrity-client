import { Outlet } from 'react-router';
import classes from './MainContent.module.scss';
import { Link } from 'react-router-dom';
import CookiePopup from '../../components/dumb/cookie-popup/CookiePopUp';
import { useEffect, useState } from 'react';
import { LocalStorageKeys } from '../../../shared/constants';
import { useOrders } from '../../../app/hooks';

const MainContent = (props: any) => {
    const [showCookiePopup, setShowCookiePopup] = useState(false);
    useEffect(() => {
        const cookiePreferences = window.localStorage.getItem(LocalStorageKeys.cookiePreferences);
        if (cookiePreferences == null)
            setShowCookiePopup(true);
    }, []);

    // We don't want to miss any order changes, so we're currently keeping the order subscription live permanently.
    // Not the most ellegant of solutions, but it's sufficient for our purposes.
    const orders = useOrders();

    return <main className={classes.mainContent}
    >
        <div className={classes.content}>
            <Outlet />
        </div>
        <footer className={classes.footer}>
            <div className={classes.links}>
                <div><Link to={'/about'} className='clean'>About</Link>|</div>
                <div><Link to={'/help'} className='clean'>Help</Link>|</div>
                <div><Link to={'/contact-us'} className='clean'>Contact Us</Link>|</div>
                <div><Link to={'/privacy-policy'} className='clean'>Privacy Policy</Link>|</div>
                <div><Link to={'/terms-and-conditions'} className='clean'>Terms and Conditions</Link></div>
            </div>
            <div className={classes.copyright}>© {new Date().getFullYear()} Alacrity - Trade with Alacrity</div>
        </footer>

        {
            showCookiePopup && <CookiePopup onClose={() => setShowCookiePopup(false)}
            />
        }
    </ main>
};
export default MainContent;