import React, { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { resetPassword } from "../../store/user-actions";
import { useEffect } from "react";
import Loader from "../layout/loader/Loader";
import { useHistory, useParams } from "react-router-dom";
import { forgotPasswordActions } from "../../store/forgotPassword-slice";

const ResetPassword = () => {
  const { token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isUpdated } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.set("password", password);
    userData.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, userData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(forgotPasswordActions.clearError());
    }
    if (isUpdated) {
      alert.success("Reset password successfully");
      history.push("/login");
      dispatch(forgotPasswordActions.resetPasswordReset());
    }
  }, [dispatch, alert, error, isUpdated, history]);

  return (
    <Fragment>
      {loading && <Loader />}
      {!loading && (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
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
                  value="Reset password"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
