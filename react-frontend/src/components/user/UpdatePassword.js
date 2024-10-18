import React, { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updateMyPassword } from "../../store/user-actions";
import { useEffect } from "react";
import { profileActions } from "../../store/profile-slice";
import Loader from "../layout/loader/Loader";
import { useHistory } from "react-router-dom";

const UpdatePassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.set("currentPassword", currentPassword);
    userData.set("password", password);
    userData.set("confirmPassword", confirmPassword);
    dispatch(updateMyPassword(userData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(profileActions.clearError());
    }
    if (isUpdated) {
      alert.success("Update password successfully");
      history.push("/account");
      dispatch(profileActions.profileReset());
    }
  }, [dispatch, alert, error, isUpdated, history]);

  return (
    <Fragment>
      {loading && <Loader />}
      {!loading && (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change password"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
