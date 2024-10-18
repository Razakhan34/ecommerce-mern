import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useHistory } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../store/user-actions";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/Loader";
import { profileActions } from "../../store/profile-slice";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar?.url ? user.avatar.url : "/Profile.png");
    }
    if (error) {
      alert.error(error);
      dispatch(profileActions.clearError());
    }
    if (isUpdated) {
      alert.success("profile updated successfully");
      dispatch(loadUser());

      history.push("/account");
      dispatch(profileActions.profileReset());
    }
  }, [dispatch, error, alert, isUpdated, history, user]);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const signUpData = new FormData();
    signUpData.set("name", name);
    signUpData.set("email", email);
    signUpData.set("avatar", avatar);
    dispatch(updateProfile(signUpData));
  };

  const updateProfileDataHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <div className="updateProfileContainer">
        {loading && <Loader />}
        {!loading && (
          <Fragment>
            <MetaData title="Update Profile" />
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataHandler}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
