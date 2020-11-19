import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

const DialogObservacion = (props) => {
  if(props.turno){
    return ( <Dialog
        open={props.esVisible}
        onClose={() => props.cambiarVisible(false)}
        aria-labelledby="alert-dialog-title-Observacion"
        aria-describedby="alert-dialog-description-Observacion"
      >
        <DialogTitle id="alert-dialog-title-Observacion">
          {"Comentario de "+ props.turno.nombrePersona+":" }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description-Observacion">
          {props.turno.observaciones}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => props.cambiarVisible(false)}
            color="primary"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog> );
      }else{return (<></>);}
}
 
export default DialogObservacion;