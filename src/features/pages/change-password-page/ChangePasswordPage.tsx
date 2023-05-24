import classes from './ChangePasswordPage.module.scss';

import { useState } from "react";
import { useChangePasswordMutation } from "../../../app/api/authenticationApi";
import TextInput from "../../../controls/text-input/TextInput";
import Button from "../../../controls/button/Button";
import { invalidSymbolRegex, isStrongPassword } from "../../../utils/authenticationUtil";
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../../app/slices/loginSlice';

export interface ChangePasswordPageProps { }

const ChangePasswordPage = (props: ChangePasswordPageProps) => {
  const dispatch = useDispatch();
  const [attemptChangePassword, changePasswordResult] = useChangePasswordMutation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeated, setNewPasswordRepeated] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validationMessages: string[] = [];
  if (newPassword != newPasswordRepeated)
    validationMessages.push('New Password must match New Password Repeated.');
  if (newPassword.length < 8)
    validationMessages.push('New Password musst contain at least 8 characters.');
  if (!isStrongPassword(newPassword))
    validationMessages.push('Password must contain at least one uppercase character, and contain at least one symbol (!@#$%^&*-+).');
  const badCharacters = newPassword.match(invalidSymbolRegex); 
  if (badCharacters != null && badCharacters?.length! > 0) {
    validationMessages.push(`'${badCharacters.join()}' are not a permitted symbols`);
  }

  return <section className="page rotate-root">
    <div className="card left">
      <h2>Change Password</h2>

      <TextInput label="Old Password" value={oldPassword} onChange={e => setOldPassword(e)} isPassword />
      <TextInput label="New Password" value={newPassword} onChange={e => setNewPassword(e)} isPassword />
      <TextInput label="New Password Repeated" value={newPasswordRepeated} onChange={e => setNewPasswordRepeated(e)} isPassword />

      {
        newPassword.length > 0 && validationMessages.length > 0 && <div className={classes.validationMessage}>
          {validationMessages.map((m, idx) => <div key={idx}> {m}</div>)}
        </div>
      }

      {
        errorMessage.length > 0 && <div className={classes.validationMessage}>
          {errorMessage}
        </div>
      }

      <div className="card-footer">
        <Button
          text="Change Password"
          disabled={changePasswordResult.isLoading || validationMessages.length > 0}
          kind="main"
          size="medium"
          onClick={() => attemptChangePassword({
            existingPassword: oldPassword,
            newPassword: newPassword
          }).then((res) => {
            if ('data' in res) {
              if (res.data.succeeded) {
                dispatch(setLoggedIn(false));
              }
              else {
                setOldPassword("");
                setNewPassword("");
                setNewPasswordRepeated("");
                setErrorMessage(res.data.errorMessage)
              }
            }
          })}
        />
      </div>
    </div>
  </section>
}

export default ChangePasswordPage;