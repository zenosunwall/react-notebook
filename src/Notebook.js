import React from 'react';

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

        const tempNotes = this.state.notes;
        var index = tempNotes.push(note) - 1;
        console.log(tempNotes);

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
        this.setState({curNote: note});
    }

    updateNoteBody = (e) =>
    {
        let note = Object.assign({}, this.state.curNote);
        note.body = e.target.value;
        this.setState({curNote: note});
    }

    render() {
        const noteList = this.state.notes.map(
            note => <li key={note.title}>{note.title}</li>
        )

        let note;
        if (this.state.curNote === null) {
            note = <div></div>
        }
        else {
            note = (
                <div className='col-9 col-sm-6 col-xs-12'>
                    <input id='title' type='text' value={this.state.curNote.title} onChange={this.updateNoteTitle} />
                    <br />
                    <textarea id='body' placeholder='Place Notes Here' value={this.state.curNote.body} onChange= {this.updateNoteBody} />
                </div>
            );
        }

        return (
            <div className='container'>
                <div className='row' >
                    <div className='col-3 col-sm-6 col-xs-12' >
                        <ul>{noteList}</ul>
                        <input id='new-note-title' type='text' placeholder='Enter New Title' value={this.newTitle} onChange={e => this.setState({ newTitle: e.target.value })} />
                        <br />
                        <button id='new-note-button' type='button' onClick={this.createNote} >Create Note</button>
                    </div>
                    {note}
                </div>
            </div>
        )
    }
}

export default Notebook;