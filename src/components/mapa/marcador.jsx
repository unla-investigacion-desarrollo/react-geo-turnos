import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";

const WIDTH_ICON = 75;
const HEIGHT_ICON = 75;

const useStyles = makeStyles((theme) => ({
  icon: {
    position: "absolute",
    width: WIDTH_ICON,
    height: HEIGHT_ICON,
    right: WIDTH_ICON / -2,
    top: HEIGHT_ICON * -1 + HEIGHT_ICON * 0.05,
    color: "red",
  },
}));

const Marcador = () => {
  const classes = useStyles();
  return <RoomIcon className={classes.icon} />;
};

export default Marcador;
