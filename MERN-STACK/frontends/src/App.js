
import React from 'react';
import {BrowserRouter , Route}  from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
import NoteList from './components/NoteList';
function App() {
  return (
   <BrowserRouter>
   <Navigation/>
   <div className="container p-4">
    <Route path="/" exact component = {NoteList} ></Route>
    <Route path="/edit/:id" component = {CreateNote} ></Route>
    <Route path="/create" component = {CreateNote} ></Route>
    <Route path="/user" component = {CreateUser} ></Route>
    </div>
   </BrowserRouter>
    
  );
}

export default App;
