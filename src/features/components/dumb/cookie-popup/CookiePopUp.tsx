import { Link } from 'react-router-dom';
import classes from './CookiePopUp.module.scss';
import Button from '../../../../controls/button/Button';
import { useEffect, useState } from 'react';
import { focusHandler } from '../../../../utils/accessibilityUtil';
import { LocalStorageKeys } from '../../../../shared/constants';

interface CookieSplashProps {
  onAcceptAll: () => void,
  onViewPreferences: () => void
}
const CookieSplash = (props: CookieSplashProps) => {
  return <div className={classes.info} >
    <div >
      <h3>Cookie Notice</h3>
      <div>
        We use cookies to provide login services, to maintain your session across visits,
        to enchance your experience of the site, and to provide telemetry services for
        opted-in users.
      </div>
      <div className="m-v-m">
        You can change your cookie preference at any time from <Link to="/settings">Your Settings</Link>.
        For a comprehensive breakdown of cookie usage, please see our <Link to="/privacy-policy">Privacy Policy</Link>.
      </div>
    </div>

    <div className={classes.buttons}>
      <Button size="medium" kind="sub" text="Preferences" onClick={props.onViewPreferences} />
      <Button size="medium" text="Accept All" onClick={props.onAcceptAll} />
    </div>
  </div>
}

interface CookiePreferencesProps {
  onBack?: () => void,
  onAccept: (s: { [s: string]: boolean }) => void
}
const CookiePreferences = (props: CookiePreferencesProps) => {
  const [functional, setFunctional] = useState(false);
  const [performance, setPerformance] = useState(false);

  useEffect(() => {
    try {
      const cookiePreferences = window.localStorage.getItem(LocalStorageKeys.cookiePreferences);
      const parsedPreferences = JSON.parse(cookiePreferences ?? '');
      if (parsedPreferences.functional === true)
        setFunctional(true);
      if (parsedPreferences.performance === true)
        setPerformance(true);
    }
    catch {
      // We default to false, so no need for additional handling
    }
  }, []);

  return <div className={classes.info}>
    <h3>Cookie Preferences</h3>

    <div className="m-v-m">
      <h4>Essential Cookies <input type="checkbox" disabled checked /></h4>
      These cookies are essential to the functioning of the site. They cannot be turned off.
    </div>

    <div className="m-v-m">
      <h4>
        Functional Cookies
        <input type="checkbox"
          checked={functional}
          onChange={() => setFunctional(!functional)}
          onKeyUp={focusHandler}
        />
      </h4>

      Cookies which enhance the user experience of the site.
      Without these cookies, certain non-essential functionality will not work.
    </div>

    <div className="m-v-m">
      <h4>
        Performance Cookies
        <input type="checkbox"
          checked={performance}
          onChange={() => setPerformance(!performance)}
          onKeyUp={focusHandler}
        />
      </h4>
      These cookies are used to collect performance telemetry information.
      Telementry is opt-in, and will only function if this cookie is enabled.
    </div>

    <div className={classes.buttons}>
      {props.onBack && <Button size="medium" kind="sub" text={'Back'} onClick={props.onBack} />}
      <Button size="medium" text={'Submit'} onClick={() => {
        props.onAccept({ functional, performance })
      }} />
    </div>
  </div>
}

export interface CookiePopupProps {
  defaultShowPreferences?: boolean,
  onClose: () => void
}
const CookiePopup = (props: CookiePopupProps) => {
  const [showPreferences, setShowPreferences] = useState(props.defaultShowPreferences ?? false);

  return <div className={classes.cookiePopup}>
    {
      !showPreferences && <CookieSplash
        onAcceptAll={() => {
          window.localStorage.setItem(
            LocalStorageKeys.cookiePreferences,
            JSON.stringify({ 'functional': true, 'performance': true })
          )
          props.onClose();
        }}
        onViewPreferences={() => setShowPreferences(true)}
      />
    }
    {!!showPreferences && <CookiePreferences
      onBack={props.defaultShowPreferences ? undefined : () => {
        setShowPreferences(false);
      }}
      onAccept={(newPreferneces) => {
        window.localStorage.setItem(LocalStorageKeys.cookiePreferences, JSON.stringify(newPreferneces))
        props.onClose();
      }}
    />}
  </div>
}

export default CookiePopup;