import React, { Component } from 'react'
import axios from 'axios';

export default class CreateUser extends Component {
    state = {
        listUser : [],
        userName: ""

    }
        async componentDidMount(){
            this.getListUser();
            // console.log(this.state.listUser);
            }


     async getListUser (){
        const res = await axios.get("http://localhost:4000/api/users");
        this.setState({listUser: res.data});
    }

    //metodo onChange para capturar el input que almacera el valor de usar name en la bd
    onChangeUserName = (e) =>{
        this.setState({userName: e.target.value});
    }

    enviarInfo = async (e) =>{
        e.preventDefault();
        await axios.post("http://localhost:4000/api/users",{
        userName: this.state.userName
        });

        this.setState({userName: ''});
        this.getListUser();
    }

    deleteUser = async (id)=>{
        await axios.delete("http://localhost:4000/api/users/"+ id);
        this.getListUser();
    }


    render() {
        return (
           <div className="row">
               <div className="col-md-4">
                  <div className="card card-body">
                      <h3>Crear nuevo usuario</h3>
                    <form  onSubmit={this.enviarInfo}>
                        <div className="form-group">
                            <input value={this.state.userName} type="text" className="form-control"
                                onChange={this.onChangeUserName}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>
                  </div>
               </div>
               <div className="col-md-8">
                   <ul className="list-group">
                       {
                           this.state.listUser.map(user => (
                           <li 
                           key={user._id} className="list-group-item list-group-item-action"
                           onDoubleClick={()=>this.deleteUser(user._id)}> 
                           {user.userName}

                           </li>
                            ))
                            
                       }
                   </ul>
               </div>
           </div>
            
        )
    }
}
