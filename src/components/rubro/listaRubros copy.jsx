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

const ListaRubros = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    rubros: [],
  });

  useEffect(() => {
    apiCalls.getRubro().then((response) => {
      setState({ rubros: response.data });
    });
  }, []);

  return (
    <>
      <Typography variant="h3" color="initial">
        Lista Rubros:
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/rubros/nuevo"
      >
        Agregar Rubro
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre Rubro</TableCell>
              <TableCell>Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rubros.map((rub) => (
              <TableRow key={rub.idRubro}>
                <TableCell>{rub.idRubro}</TableCell>
                <TableCell>{rub.nombre}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    component={Link}
                    to={"/rubros/" + rub.idRubro}
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

export default ListaRubros;
