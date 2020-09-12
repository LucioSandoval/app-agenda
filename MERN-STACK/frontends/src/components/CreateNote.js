import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {

    state ={
        listUser: [],
        userSelected: '',
        title: '',
        description:'',
        date: new Date(),
        editar: false,
        idNote: ''

    }

    componentDidMount(){
        this.getListUser();
        if(this.props.match.params.id){
            this.getDetalleUser();
            this.setState({
                editar: true,
                idNote: this.props.match.params.id
            });
        }

    }

    getDetalleUser = async () => {
       const nota=  await axios.get("http://localhost:4000/api/notes/"+ this.props.match.params.id);

       this.setState({
           title: nota.data.title,
           description: nota.data.description,

        })
    }

    getListUser = async () =>{
       const users = await axios.get("http://localhost:4000/api/users");
       this.setState({listUser:users.data.map(user => user.userName),
    userSelected: users.data[0].userName});
    }

    enviarInfo = async (e) =>{
        e.preventDefault();
        if(this.state.editar){
            await axios.put("http://localhost:4000/api/notes/"+ this.state.idNote,{
                title: this.state.title,
                description: this.state.description,
                autor: this.state.userSelected,
               
                });
        }else{
            await axios.post("http://localhost:4000/api/notes",{
                title: this.state.title,
                description: this.state.description,
                autor: this.state.userSelected,
                date: this.state.date
                });
        }
      
        window.location.href="/";
    }

    onChangeTak = (e) =>{
       this.setState({[e.target.name]: e.target.value})
    }

    onChangeDate = (date) =>{
        this.setState({date:date });
    }
    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear nota</h4>
                    <div className="form-group">
                        <select className="form-control"
                        name="userSelected"
                        value={this.state.userSelected}
                        onChange={this.onChangeTak}
                        >
                        {
                            this.state.listUser.map(user =>
                        <option key={user} >{user}</option>

                        )}

                        </select>
                    </div>

                   
                    <form onSubmit={this.enviarInfo} >

                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Título"
                            name="title"
                            required
                            onChange={this.onChangeTak}
                            value={this.state.title}
                        />
                    </div>

                    <div className="form-group">
                    <textarea type="text"
                            className="form-control"
                            placeholder="Descripción"
                            name="description"
                            required
                            value={this.state.description}
                            onChange={this.onChangeTak}
                            >
                     </textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker
                        className="form-control" 
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        ></DatePicker>
                        
                    </div>

                        <button type="submit" className="btn btn-primary" > Guardar</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}
