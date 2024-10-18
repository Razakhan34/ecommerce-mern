import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Backdrop } from "@mui/material";

import "./UserOptions.css";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/user-actions";

const UserOptions = ({ user }) => {
  const alert = useAlert();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    { icon: <ListAltIcon />, name: "orders", func: orders },
    { icon: <PersonIcon />, name: "profile", func: profile },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "logout", func: logout },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }
  function orders() {
    history.push("/orders");
  }
  function profile() {
    history.push("/account");
  }
  function cart() {
    history.push("/cart");
  }
  function logout() {
    dispatch(logoutUser());
    alert.success("Logout successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "111" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar?.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((currOption) => (
          <SpeedDialAction
            key={currOption.name}
            icon={currOption.icon}
            tooltipTitle={currOption.name}
            tooltipOpen={window.innerWidth <= 600 ? open : false}
            onClick={currOption.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
