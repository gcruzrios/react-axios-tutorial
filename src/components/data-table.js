import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import axios from 'axios';

//const [usuarios,setUsuarios] = useState([]);
let Usuarios = [];

class DataTable extends Component {

    state = {
        data: this.props.obj,
        modalActualizar: false,
        modalInsertar: false,
        form: {
          id: "",
          name: "",
          email: "",
        },
      };
    

    mostrarModalActualizar = (dato) => {
      this.setState({
        form: dato,
        modalActualizar: true,
       });
    };
    
    cerrarModalActualizar = () => {
      this.setState({ modalActualizar: false });
    };


    obtenerUsuarios= async() => {
        
        const respuesta = await axios.get(`http://localhost:4000/users/`)
      
        //console.log(respuesta.data);
        Usuarios = respuesta.data;
        console.log(respuesta.data);
        window.location.reload(false);
        //this.render();
    }


    eliminar =  async (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato._id);
        //var lista = this.state.data;

        if (opcion === true) {
          
            const respuesta = await axios.delete(`http://localhost:4000/users/delete/${dato._id}`)
            .then((res) => {
                console.log(respuesta.data)
            }).catch((error) => {
                console.log(error)
            });
         
            this.obtenerUsuarios();
          
            this.setState(Usuarios);


        }
      };

    render() {
        return (
           <> 
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td><Link to={`/edit-user/${this.props.obj._id}`} className="btn btn-primary"> Edit </Link></td>

                <td> <button className="btn btn-danger" onClick={()=> this.eliminar(this.props.obj)}> Delete</button> </td>
            </tr>
            {/* isOpen={this.state.modalActualizar} */}
          </>
        );
    }
}

export default DataTable;