import classes from './SettingsPage.module.scss';
import { useEffect, useState } from 'react';
import Select from '../../../controls/select/Select';
import { Link, useNavigate } from 'react-router-dom';
import { useClientSettingsQuery, useSetClientSettingMutation } from '../../../app/api/clientsApi';
import { ClientSettingName } from '../../../app/enums/client/clientSettingName';
import { VisualizationQuality } from '../../../app/enums/client/visualizationQuality';
import Button from '../../../controls/button/Button';
import CookiePopUp from '../../components/dumb/cookie-popup/CookiePopUp';
import { LocalStorageKeys } from '../../../shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectVisualizationQuality, setVisualizationQuality } from '../../../app/slices/loginSlice';

export interface SettingsPageProps { }

enum SessionDuration {
  Unknown = 0,
  Mins15 = 15,
  Mins30 = 30,
  Hours1 = 60,
  Hours6 = 6 * 60,
  Days1 = 24 * 60,
  Days7 = 7 * 24 * 60,
  Days30 = 30 * 24 * 60
}

let shouldTriggerTelemetryAnimation = false;

const SettingsPage = () => {
  const navigate = useNavigate();
  const visualizationQuality = useSelector(selectVisualizationQuality);
  const dispatch = useDispatch();
  const [showCookiePopup, setShowCookiePopup] = useState(false);
  const { isLoading, isError, isFetching, data: clientSettings } = useClientSettingsQuery({});
  const [setClientSetting, setProgress] = useSetClientSettingMutation();

  return <section className="page rotate-root">
    <div className="card left">
      <h2>Settings</h2>

      <div>
        <h3>Passwords and Authentication</h3>
        <div className={classes.actions}>
          <Button text='Change Password' kind='sub' onClick={() => navigate('/change-password')} />
          <Button text='Change Email' kind='sub' onClick={() => navigate('/change-email')} />
          <Button text='Update Address' kind='sub' onClick={() => navigate('/update-address')} />
        </div>
      </div>

      <div className={classes.section}>
        <h3>
          Session Duration
        </h3>

        <p>
          Sessions are valid for a day by default, but this can be inappropriate for some security conscious users.
          Actively using the website will prolong the current session for at most 15 minutes.
        </p>

        <div className={classes.select}>
          <Select
            value={clientSettings?.sessionDurationMins}
            values={[
              { label: '15 Minutes', value: SessionDuration.Mins15 },
              { label: '30 Minutes', value: SessionDuration.Mins30 },
              { label: '1 Hour', value: SessionDuration.Hours1 },
              { label: '6 Hours', value: SessionDuration.Hours6 },
              { label: '1 Day', value: SessionDuration.Days1 },
              { label: '7 Days', value: SessionDuration.Days7 },
              { label: '30 Days', value: SessionDuration.Days30 },
            ]}
            label='Session Duration'
            placeholder='Please select a session duration'
            onSelect={value => setClientSetting({ clientSetting: { name: ClientSettingName.sessionDuration, value: value.toString() } })}
            required
            disabled
          />
        </div>
      </div>

      <div>
        <h3>API Token</h3>
        <div>
          <p>
            The below API token can be used to access our trading platform API.
            This can be used to monitor account activity, place trades, and perform many other activites useful to automated account management.
          </p>

          <p>
            <b>NEVER SHARE THIS TOKEN!</b>
          </p>

          <p> It is automatically authenticated to your account, and could potentially be used by attackers to steal account funds or place malicious trades.
            Always keep your account token secret.
          </p>

          <input type="text" className={classes.apiToken} value="12345678-abcd-dcba-0987-098765432109" tabIndex={0} readOnly />

          <div className={classes.actions}>
            <Button text='Generate New Token' kind='sub' />
            <Button text='Invalidate Current Token' kind='sub' />
          </div>
        </div>
      </div>
    </div>

    <div className="card right">
      <div className={classes.section}>
        <h3>Visualizations</h3>

        <p>
          Alacrity provides high fidelity visulizations for an improved user expierence,
          and to aide financial decision making. High Fidelity visulizations are used
          throughout the site by default. These visulizations can be very demanding however,
          particularly for client's on lower powered devices with limited battery life.
        </p>

        <p>
          Would you like to continue using these enhanced visulizations?
        </p>

        <div className={classes.select}>
          <Select
            value={visualizationQuality}
            values={[
              { label: 'Disable Visulizations', value: VisualizationQuality.Disabled },
              { label: 'Use Simplified Visulizations', value: VisualizationQuality.Low },
              { label: 'Use High Fidelity Visulizations', value: VisualizationQuality.High },
            ]}
            onSelect={value => {
              window.localStorage.setItem(LocalStorageKeys.visualizationPreferences, value);
              dispatch(setVisualizationQuality(value));
            }}
            label='Visulization Quality'
            placeholder='Please select your prefered visulization Quality'
            required
            disabled={setProgress.isLoading || isFetching}
          />
        </div>
      </div>

      <div className={classes.section}>
        <h3>Telementry</h3>

        <p>
          The Alacrity application has the capability to record user actions, client side application errors,
          and other meaningful disagnostic and usage metrics. Although disabled by default, telemetry is a valueable informational tool which
          allows the Alacrity team to provide the best possible user experience to the client.
        </p>

        <p>
          The Alacrity development team is very grateful for those client's who choose to share this
          information with us.
        </p>

        <div className={classes.select}>
          {shouldTriggerTelemetryAnimation && <div className={classes.telemetryAnimationWrapper}>
            <div className={classes.telemetryAnimation}>
              Thank You!
              🤗
            </div>
          </div>}
          <Select
            value={clientSettings?.isTelemetryEnabled}
            values={[
              { label: 'Disabled', value: false },
              { label: 'Enabled', value: true }
            ]}
            onSelect={value => {
              if (clientSettings?.isTelemetryEnabled !== true && value === true)
                shouldTriggerTelemetryAnimation = true;
              else
                shouldTriggerTelemetryAnimation = false;

              setClientSetting({
                clientSetting: { name: ClientSettingName.telementryPreference, value: value ? 'enabled' : 'disabled' }
              });
            }}
            label='Telemetry Preference'
            placeholder='Please set your Telementry Preference'
            required
            disabled={setProgress.isLoading || isFetching}
          />
        </div>

        <div className={classes.section}>
          <h3>Cookie Prefences</h3>
          <div className="m-v-m">
            You can update how we use and process cookie data at any time by updating your cookie settings.
            These changes will take immediate effect.
          </div>
          <Button text="Update Cookie Preferences" kind='sub' onClick={() => setShowCookiePopup(true)} />
        </div>

        <p>
          <Link to="/privacy-policy">Click here to view our Privacy Policy</Link>
        </p>
      </div>
    </div>

    {
      showCookiePopup && <CookiePopUp
        defaultShowPreferences={true}
        onClose={() => setShowCookiePopup(false)}
      />
    }

  </section >
}
export default SettingsPage;