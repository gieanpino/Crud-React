import React from 'react';
import {Link} from 'react-router-dom';
import Api from "../Servicios/api";
class Editar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            datosCargados:false,
            empleado:[]
          }
    }
    cambioValor=(e)=> 
    {
        const state=this.state.empleado;
        state[e.target.name]=e.target.value;
        this.setState({empleado:state});
    }
    enviarDatos=(e)=>
    {   e.preventDefault();
        console.log("Formulario Enviado...");

        const{id,nombre,correo}=this.state.empleado;
        console.log(id);
        console.log(nombre);
        console.log(correo);
        var datosEnvio={id:id,nombre:nombre,correo:correo}

        fetch(Api+"/?actualizar=1",{
            method:"POST",
            body:JSON.stringify(datosEnvio)
        })
        .then(respuestas=>respuestas.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.props.history.push("/")
        })
        .catch(console.log)
    }
    componentDidMount(){
        console.log(this.props.match.params.id);
        fetch(Api+"/?consultar="+this.props.match.params.id)
        .then(respuestas=>respuestas.json())
        .then((datosRespuesta)=>{
            console.log("=>"+datosRespuesta);
            this.setState({
                datosCargados:true,
                empleado:datosRespuesta[0]
                });
            })
        .catch(console.log)
    }
    render() { 
        const{datosCargados, empleado}=this.state
        if(!datosCargados){return (<div>Cargando...</div>);}
        else{

        return ( 
            <div className="card">
                <div className="card-header">
                    Editar Empleado
                </div>
                <div className="card-body">
                   <form onSubmit={this.enviarDatos}>
                          <div className="form-group">
                          <label htmlFor="">identificador:</label>
                          <input type="text" readOnly className="form-control" value={empleado.id} name="" id="" aria-describedby="helpId" placeholder="" required/>
                          <small id="helpId" className="form-text text-muted">Help text</small>
                        </div>
                       <div className="form-group">
                          <label htmlFor="">Nombre</label>
                          <input required  type="text" name="nombre" onChange={this.cambioValor} value={empleado.nombre} id="nombre" className="form-control" placeholder="" aria-describedby="helpId" />
                          <small id="helpId" className="text-muted">Escribe el nombre del empleado</small>
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Correo</label>
                          <input  required type="text" name="correo" onChange={this.cambioValor} value={empleado.correo}id="correo" className="form-control" placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="text-muted">Escribe el correo del empleado</small>
                        </div>
                        <br></br>
                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-outline-success">Actualizar empleado</button>
                            <Link to={"/"} className="btn btn-outline-dark">Cancelar</Link>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">
                   
                </div>
            </div>
         );}
    }
}
 
export default Editar;