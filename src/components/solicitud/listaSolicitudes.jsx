import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Person from "@material-ui/icons/Person";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Comments from "@material-ui/icons/Comment";
import { Typography, Divider, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    height: window.screen.availHeight - 300,
  },
}));

const ListaSolicitudes = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" color="initial">
        Solicitudes
      </Typography>
      <Card>
        <List className={classes.root}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <React.Fragment key={value}>
                  <ListItem key={value} role={undefined} dense button>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`Nombre y apellido persona ${value + 1}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        size="small"
                        color="secondary"
                        variant="contained"
                      >
                        <Close />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        variant="contained"
                      >
                        <Check />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        variant="contained"
                      >
                        <Comments />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            }
          )}
        </List>
      </Card>
    </>
  );
};

export default ListaSolicitudes;
