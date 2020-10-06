import React, { useState, useEffect } from "react";
import { TableContainer, Paper, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { apiCalls } from "../../api/apiCalls";
import { DataGrid } from "@material-ui/data-grid";

const ListaTipoEmprendimientos = () => {
  const [state, setState] = useState({
    tipoEmprendimientos: [],
  });

  useEffect(() => {
    apiCalls.getTipoEmprendimiento().then((response) => {
      let listaTipoEmprendimiento = [];
      response.data.map((tipoEmprendimiento) =>
        listaTipoEmprendimiento.push({
          id: tipoEmprendimiento.idTipoEmprendimiento,
          nombre: tipoEmprendimiento.nombre,
        })
      );
      setState({ tipoEmprendimientos: listaTipoEmprendimiento });
    });
  }, []);

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "nombre",
      headerName: "Nombre Tipo de Emprendimiento",
      width: 300,
    },
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
            to={"/tipoEmprendimientos/" + params.getValue("id")}
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
      <TableContainer
        component={Paper}
        style={{ height: "70vh", minWidth: 600, width: "99%" }}
      >
        <div style={{ height: "70vh", width: "100%" }}>
          <DataGrid
            rows={state.tipoEmprendimientos}
            columns={columns}
            pageSize={10}
          />
        </div>
      </TableContainer>
    </>
  );
};

export default ListaTipoEmprendimientos;
