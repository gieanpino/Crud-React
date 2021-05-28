import React from 'react';
import {Link } from "react-router-dom";
import Api from "../Servicios/api";
class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            empleados:[]
         }
    }
    borrarRegistro=(id)=>{
        console.log(id);
        fetch(Api+"/?borrar="+id)
        .then(respuestas=>respuestas.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
           this.cargarDatos();
            
        })
        .catch(console.log)
    }
    cargarDatos(){
        fetch(Api)
        .then(respuestas=>respuestas.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.setState({datosCargados:true,empleados:datosRespuesta});
        })
        .catch(console.log)

    }
    componentDidMount(){
        this.cargarDatos();
    }
    render() { 
        const{datosCargados, empleados}=this.state
        if(!datosCargados){return (<div>Cargando...</div>);}
        else{
          
        return (  
            <div className="card">
            <div className="card-header">
            <Link type="button" className="btn btn-outline-success" to={"/crear"}>Agregar nuevo empleado</Link>
            </div>
            <div className="card-body">
            <h4>Lista de empleados</h4> 
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nombre</th>
                        <th>correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map(
                        (empleados)=>(
                        <tr key={empleados.id}>
                        <td >{empleados.id}</td>
                        <td>{empleados.nombre}</td>
                        <td>{empleados.correo}</td>
                        <td>
                            <div className="btn-group" role="group" aria-label="">
                            <Link type="button" className="btn btn-outline-warning" 
                                to={"/editar/"+empleados.id}>
                                Editar</Link>
                                <button type="button" className="btn btn-outline-danger" 
                                onClick={()=>this.borrarRegistro(empleados.id)}>Borrar
                                </button>
                            </div>
                        </td>
                    </tr>
                    ))}
                    
                   
                </tbody>
            </table>
            </div>
            <div className="card-footer text-muted">
            
            </div>
        </div>
           
           ); }
    }
}
 
export default Listar;