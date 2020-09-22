import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { apiCalls } from "../../api/apiCalls";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListaPerfiles = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    perfiles: [],
  });

  useEffect(() => {
    apiCalls.getPerfil().then((response) => {
      setState({ perfiles: response.data });
    });
  }, []);

  return (
    <>
      <Typography variant="h3" color="initial">
        Lista Perfiles:
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/perfiles/nuevo"
      >
        Agregar Perfil
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Perfil</TableCell>
              <TableCell>Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.perfiles.map((per) => (
              <TableRow key={per.idPerfil}>
                <TableCell>{per.idPerfil}</TableCell>
                <TableCell>{per.nombre}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    component={Link}
                    to={"/perfiles/" + per.idPerfil}
                  >
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListaPerfiles;
