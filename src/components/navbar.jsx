import React from "react";
import { useDispatch } from "react-redux"; //metodo que sirva para usar los reducers
import { cambiarVista } from "./menuSlice"; //reducer para cambiar el estado

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a
              className="nav-link"
              href="#"
              onClick={() => dispatch(cambiarVista(1))}
            >
              form1 <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => dispatch(cambiarVista(2))}
            >
              form2
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => dispatch(cambiarVista(3))}
            >
              form3
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => dispatch(cambiarVista(4))}
            >
              form4
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => dispatch(cambiarVista(5))}
            >
              form5
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => dispatch(cambiarVista(6))}
            >
              productos
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => dispatch(cambiarVista(7))}
            >
              prodsMod
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
