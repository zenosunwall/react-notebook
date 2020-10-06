import React from 'react'

function noteDisplay({curNote, updateNoteTitle, updateNoteBody, deleteNote}) {
    if (curNote === null) {
        return <div></div>
    }

    else {
        return (
            <div className='col-12 col-sm-6 col-md-9'>
                <div className='row'>
                    <div className='col-8'>
                        <input id='title' type='text' value={curNote.title} onChange={updateNoteTitle} />
                    </div>
                    <div className='col-3'>
                        <button id='delete-note' type='button' onClick={deleteNote}>Delete Note</button>
                    </div>
                </div>
                <br />
                <textarea id='body' placeholder='Place Notes Here' value={curNote.body} onChange={updateNoteBody} />
            </div>
        );
    }
}

export default noteDisplay