import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

const DialogRechazar = (props) => {
  if(props.turno){
    return ( <Dialog
        open={props.esVisible}
        onClose={() => props.cambiarVisible(false)}
        aria-labelledby="alert-dialog-title-Rechazar"
        aria-describedby="alert-dialog-description-Rechazar"
      >
        <DialogTitle id="alert-dialog-title-Rechazar">
          {"¿Estas seguro de rechazar el turno de "+ props.turno.persona.nombre+"?" }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description-Rechazar">
          {props.turno.fechaHora +
                      " - " +
                      props.turno.persona.nombre +
                      " " +
                      props.turno.persona.apellido}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => props.cambiarVisible(false)}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            color="secondary"
            autoFocus
            variant="contained"
            onClick={() => {
              props.rechazar(props.turno.idTurno);
              props.cambiarVisible(false);
            }}
          >
            Rechazar
          </Button>
        </DialogActions>
      </Dialog> );
      }else{return (<></>);}
}
 
export default DialogRechazar;