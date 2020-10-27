export const formatDatosPersonales = (values) =>{
    return{
        apellido: values.apellido,
        celular: values.celular,
        cuil: values.cuil,
        dni: values.dni,
        idPerfil: 2,
        loginVo: {
            clave: values.password,
            email: values.email,
        },
        nombre: values.nombre,
        numeroTramite: values.nroTramite,
        sexo: values.sexo,
        ubicacionVo: {
            calle: values.calle,
            departamento: values.departamento,
            idLocalidad: values.localidad,
            idProvincia: values.provincia,
            latitud: "1",
            longitud: "1",
            numero: values.numero,
            piso: values.piso,
            usuarioModi: "web"
        },
        usuarioModi: "web"
    };
}