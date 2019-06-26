import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBJIx0xlCQohDNGCNXXNPCqHv_e1hOmx94',
  authDomain: 'lab3-dhungjookim.firebaseapp.com',
  databaseURL: 'https://lab3-dhungjookim.firebaseio.com',
  projectId: 'lab3-dhungjookim',
  storageBucket: 'lab3-dhungjookim.appspot.com',
  messagingSenderId: '1047854823888',
};
firebase.initializeApp(config);
const database = firebase.database();


export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

export function createNote(newTitle) {
  const newNote = {
    title: newTitle,
    text: 'Default Text from New Note',
    x: 200,
    y: 200,
    zIndex: 20,
  };
  database.ref('notes').push(newNote);
}

export function updateNote(id, newText, newTitle, note, x, y) {
  console.log(newText);
  console.log(newTitle);
  console.log(id);
  const updatedNote = {
    title: newTitle,
    text: newText,
    x,
    y,
  };
  console.log(note.position.x);
  console.log(note.position.y);

  database.ref('notes').child(id).update(updatedNote); // update similarly
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove(); // update similarly
}
