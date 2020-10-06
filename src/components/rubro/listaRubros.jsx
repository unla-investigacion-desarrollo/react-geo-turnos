import React, { useState, useEffect } from "react";
import { TableContainer, Paper, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { apiCalls } from "../../api/apiCalls";
import { DataGrid } from "@material-ui/data-grid";

const ListaRubros = () => {
  const [state, setState] = useState({
    rubros: [],
  });

  useEffect(() => {
    apiCalls.getRubro().then((response) => {
      let rubrosLista = [];
      response.data.map((rubro) =>
        rubrosLista.push({
          id: rubro.idRubro,
          nombre: rubro.nombre,
        })
      );
      setState({ rubros: rubrosLista });
    });
  }, []);

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "nombre", headerName: "Nombre Rubro", width: 300 },
    {
      field: "accion",
      headerName: "Accion",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to={"/rubros/" + params.getValue("id")}
          >
            Ver
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Typography variant="h5" color="initial">
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
      <TableContainer
        component={Paper}
        style={{ height: "70vh", minWidth: 600, width: "99%" }}
      >
        <div style={{ height: "70vh", width: "100%" }}>
          <DataGrid rows={state.rubros} columns={columns} pageSize={10} />
        </div>
      </TableContainer>
    </>
  );
};

export default ListaRubros;
