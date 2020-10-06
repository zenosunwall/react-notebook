import React from 'react';
import './Notebook.css'
import '../NoteDisplay/NoteDisplay'
import NoteDisplay from '../NoteDisplay/NoteDisplay';

class Note 
{
    constructor(title, body)
    {
        this.title = title;
        this.body = body;
    }
}

class Notebook extends React.Component {
    constructor() {
        super();
        this.state =
        {
            newTitle: '',
            curNoteIndex: null,
            curNote: null,
            notes: []
        }
    }

    createNote = () => {
        if (this.state.newTitle === '') {
            return;
        }

        let note = new Note(this.state.newTitle, '');

        let index = this.state.notes.length;
        let tempNotes = [...this.state.notes];
        
        tempNotes[index] = note;

        this.setState(
            {
                curNoteIndex: index,
                curNote: note,
                notes: tempNotes,
                newTitle: ''
            }
        );
    }

    updateNoteTitle = (e) => 
    {
        let note = Object.assign({}, this.state.curNote);
        note.title = e.target.value;
        let noteList = [...this.state.notes];
        noteList[this.state.curNoteIndex] = note;
        this.setState({
            curNote: note,
            notes: noteList
        });
    }

    updateNoteBody = (e) =>
    {
        let note = Object.assign({}, this.state.curNote);
        note.body = e.target.value;
        let noteList = [...this.state.notes];
        noteList[this.state.curNoteIndex] = note;
        this.setState({
            curNote: note, 
            notes: noteList
        });
    }

    selectNote = (index, e) => 
    {
        e.preventDefault();
        e.stopPropagation();
        
        this.setState({
            curNote: this.state.notes[index],
            curNoteIndex: index
        })
    }
    
    deleteNote = (e) =>
    {
        e.preventDefault();
        e.stopPropagation();

        console.log(this.state.curNoteIndex)

        var tempNotes = [...this.state.notes];
        var temp = tempNotes.splice(this.state.curNoteIndex, 1);
        console.log(temp)
        console.log(tempNotes)

        this.setState({
            note: null,
            curNoteIndex: null,
            notes: tempNotes
        })
    }

    render() {
        const notesAsList = this.state.notes.map(
            (note, index) => <li key={index} onClick={(e) => this.selectNote(index, e)}>{note.title}</li>
        )

        return (
            <div className='container'>
                <div className='row' >
                    <div className='col-12 col-sm-6 col-md-3' >
                        <ul>{notesAsList}</ul>
                        <input id='new-note-title' type='text' placeholder='Enter New Title' value={this.newTitle} onChange={e => this.setState({ newTitle: e.target.value })} />
                        <br />
                        <button id='new-note-button' type='button' onClick={this.createNote} >Create Note</button>
                    </div>
                    <NoteDisplay curNote={this.state.curNote} updateNoteTitle={this.updateNoteTitle} updateNoteBody={this.updateNoteBody} deleteNote={this.deleteNote} />
                </div>
            </div>
        )
    }
}

export default Notebook;