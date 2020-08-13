import React from "react";
import TextField from "@material-ui/core/TextField";

const ProductoMaterial = () => {
  return (
    <div>
      <TextField id="nombre" label="Nombre" value={""} onChange={() => null} />
    </div>
  );
};

export default ProductoMaterial;
