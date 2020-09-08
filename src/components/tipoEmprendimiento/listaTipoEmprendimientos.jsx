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

const ListaTipoEmprendimientos = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    tipoEmprendimientos: [],
  });

  useEffect(() => {
    apiCalls.getTipoEmprendimiento().then((response) => {
      setState({ tipoEmprendimientos: response.data });
    });
  }, []);

  return (
    <>
      <Typography variant="h3" color="initial">
        Lista Tipo de emprendimientos:
      </Typography>
      <Button
        color="primary"
        variant="contained"
        component={Link}
        to="/tipoEmprendimientos/nuevo"
      >
        Agregar Emprendimiento
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre Tipo de Emprendimiento</TableCell>
              <TableCell>Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.tipoEmprendimientos.map((tipoEmp) => (
              <TableRow key={tipoEmp.idTipoEmprendimiento}>
                <TableCell>{tipoEmp.idTipoEmprendimiento}</TableCell>
                <TableCell>{tipoEmp.nombre}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    component={Link}
                    to={"/tipoEmprendimientos/" + tipoEmp.idTipoEmprendimiento}
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

export default ListaTipoEmprendimientos;
