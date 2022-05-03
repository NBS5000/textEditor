import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  console.log('PUT request to update the jateDB');
  // connect to DB and version we want to use
  const jateDb = await openDB('jate', 1);
  // make new transaction...need to specify the DB we are posting to and the data privileges. 
  const tx = jateDb.transaction('jate', 'readwrite');
  // open the object store
  const objStore = tx.objectStore('jate');
  // use the .add() method to pass in content
  const req = objStore.put({ id: id, value: value })
  // confirm the data was added
  const res = await req;
  console.log('data saved to the jateDB', res);
};


export const getDb = async (value) => {

    console.log('Getting data from the jateDB');
    // connect to DB and version we want to use
    const jateDb = await openDB('jate', 1);
    // make new transaction...need to specify the DB we are posting to and the data privileges. 
    const tx = jateDb.transaction('jate', 'readwrite');
    // open the object store
    const objStore = tx.objectStore('jate');
    // use the .getAll() method to grab all the content in the DB
    const req = objStore.getAll()
    // confirm the data was fetched
    const res = await req;
    console.log('data saved to the jateDB', res);

};

initdb();
