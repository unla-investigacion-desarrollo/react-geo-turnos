import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; //metodo que sirva para usar los reducers
import { cambiarVistaConDatos } from "../navbar/menuSlice"; //reducer para cambiar el estado
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ListaProductos = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    productos: [
      {
        id: "1",
        nombre: "producto1",
        codigo: "codigoprod1",
        precio: "precio del 1",
      },
      {
        id: "2",
        nombre: "producto2",
        codigo: "codigoprod2",
        precio: "precio del 2",
      },
      {
        id: "3",
        nombre: "producto3",
        codigo: "codigoprod3",
        precio: "precio del 3",
      },
    ],
  });

  //   useEffect(() => {
  //     fetch("url")
  //       .then((response) => response.json())
  //       .then((json) => setState({json: json }));
  //   }, []);

  const buscarProducto = (id) => {
    //busco el producto por ahi
    let producto = {
      id: "1",
      nombre: "producto1",
      codigo: 351513,
      precio: 136263,
    };
    window.location.assign("/modificarProducto/" + id);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Codigo</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.productos.map((prod) => (
            <TableRow key={prod.id}>
              <TableCell>{prod.id}</TableCell>
              <TableCell>{prod.nombre}</TableCell>
              <TableCell>{prod.codigo}</TableCell>
              <TableCell>{prod.precio}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => buscarProducto(prod.id)}
                >
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListaProductos;
