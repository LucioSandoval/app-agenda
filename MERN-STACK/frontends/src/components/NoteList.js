import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';

export default class NoteList extends Component {
    state={
        listNotes: [],
    }
    componentDidMount(){
        this.getListNotes();
    }

    onClickDelete = async (id) =>{
    await axios.delete("http://localhost:4000/api/notes/"+ id);
    this.getListNotes();
    }

    getListNotes = async () => {
        const notes = await axios.get("http://localhost:4000/api/notes");
        this.setState({ listNotes: notes.data });
        console.log(this.state.listNotes);
    }

    render() {
        return (
            <div className="row">
            {
                this.state.listNotes.map( notas => (
                    <div className="col-md-4 p-2" key={notas._id}>
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <h5>{notas.title}</h5>
                                
                                <Link className="btn btn-info" to={"/edit/"+notas._id}> Editar</Link>
                            </div>
                            <div className="card-body">
                                <p > {  notas.description   } </p>
                                <p> {notas.autor} </p>
                                <p>{format(notas.date)}</p>
                                
                                  
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-danger" onClick={()=> this.onClickDelete(notas._id)} >Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))

                
            }

                
            </div>
        )
    }
}
