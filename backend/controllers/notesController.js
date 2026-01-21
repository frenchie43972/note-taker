/*
  Controller (action handlers) for note-related actions.
  Each function will corresond to one type of CRUD operation
*/
export function getAllNotes(req, res) {
  /*
    this will eventually handle the SQL logic to get * from notes
    for now justa simple response to get it working
  */
  res.json({
    message: 'getAllNotes working',
  });
}

export function createNote(req, res) {
  /*
    This will eventually hold the POST
    - read the title and body from the req.body
    - validate input
    - insert a new note into the DB
  */
  res.status(501).json({
    message: 'createNote not implemented',
  });
}
