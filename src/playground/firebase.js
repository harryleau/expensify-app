import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB7LYGAKcwGRcxXSmx7FM9dApcUF00Jkx8",
  authDomain: "expensify-208d6.firebaseapp.com",
  databaseURL: "https://expensify-208d6.firebaseio.com",
  projectId: "expensify-208d6",
  storageBucket: "expensify-208d6.appspot.com",
  messagingSenderId: "82087721620"
};

firebase.initializeApp(config);

const database = firebase.database();

///////////// SET DATA

// set data from the root
/*
database.ref().set({
  name: 'Harry Le',
  age: 25,
  isSingle: false,
  location: {
    city: 'Melbourne',
    country: 'Australia'
  }
}).then(() => {
  console.log('data is saved!');
}).catch((e) => console.log(e));
*/

// set data of one attribute
// database.ref('age').set(25);


////////////// FETCH DATA

// fetch data one time, once('value') returns a promise
/*
database.ref('location')
  .once('value')
  .then((snapshot) => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch(e => console.log('error fetching data', e));
*/

// on('value) will run eveytime data changes, therefore we use callback, not promise.
// on() will return the callback function (its 2nd argument), so we set it to a const and refer it below in off() method so that it only stop watching this on method, in case we have multiple on() methods.
/*
const onValueChange = database.ref().on('value', (snapshot) => {
  console.log(snapshot.val());
}, (e) =>  {
  console.log('Error fetching data', e);
});
*/

// we can use off() to stop the on() method (data still changes in database of course, off() just stops whatever runs in on() method, which is console.log()).
// simulate off() method
/* 
setTimeout(() => {
  database.ref('age').set(27);
}, 3000);

setTimeout(() => {
  database.ref().off(onValueChange);
}, 6000);

// this line below will not be logged in console but still recorded in firebase database.
setTimeout(() => {
  database.ref('age').set(30);
}, 9000);
*/

////////////// REMOVE DATA

// besides using remove() method, we can use set(null) to remove data.
/*
// database.ref('isSingle').set(null);

database.ref('isSingle')
  .remove()
  .then(() => console.log('removed data'))
  .catch(e => console.log('Did not remove data', e));
*/

///////////// UPDATE DATA

// update, add new data, remove data in a single call.
/*
  database.ref().update({
    isSingle: null,
    name: 'Amy',
    job: 'developer'
  });
*/

// this line below will override the orginal location because 'ref' is at the root  => country will be removed.
/*
  database.ref().update({
    location: {
      city: 'Sydney'
    }
  });
*/

// this is the correct syntax => must use quotes and indicate the path from root.
/*
database.ref().update({
  'location/city': 'Sydney'
});
*/

/////////////// ARRAY DATA
// firebase does not support array
/*
const notes = [{
  id: 'id1',
  title: 'note 1',
  body: 'this is my first note'
}, {
  id: 'id2',
  title: 'note 2',
  body: 'this is my second note'
}];

database.ref('notes').set(notes);
*/
// this set data call will work, but it turns the array elements into 2 child objects '0' and '1' 

// we have to change the way we setup data in firebase, like this:
/*
const firebaseNotes = {
  notes: {
    'id1': {
      title: 'note 1',
      body: 'this is my first note'
    },
    'id2': {
      title: 'note 2',
      body: 'this is my second note'
    }
  }
}
*/

// generate id using push() method, it will generate unique id for us

/*
database.ref('notes').push({
  title: 'To do 1',
  body: 'something to do'
});

database.ref('notes').push({
  title: 'To do 2',
  body: 'something else to do'
});
*/

// update data in array
/*
database.ref('notes/-LFDXQ2Xw_bhdxpQZ98q').update({
  title: 'updated todo'
});
*/

/////////// EXPENSES DATA

/*
database.ref('expenses').push({
  description: 'Rent',
  amount: 47500,
  note: 'Rent for June',
  createdAt: '2943524323454'
});

database.ref('expenses').push({
  description: 'Food',
  amount: 8175,
  note: 'Food for this weed',
  createdAt: '2943524622535'
});

database.ref('expenses').push({
  description: 'Games',
  amount: 3900,
  note: 'The Sims 4',
  createdAt: '2943524923454'
});
*/

/////////// convert firebase data into array using forEach() method of snapshot
// using once()
/*
database.ref('expenses')
  .once('value')
  .then((snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });

    console.log(expenses);
  })
  .catch(e => console.log(e));
*/

// using on()
/*
database.ref('expenses').on('value', (snapshot) => {
  const expenses = [];

  snapshot.forEach((childSnapshot) => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    });
  });

  console.log(expenses);
}, (e) => console.log(e));
*/

// CHILD_REMOVED event - fire off everytime a child is removed.
/*
database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});
*/

// CHILD_CHANGED event, fire off everytime a child is updated.
/*
database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});
*/

// CHILD_ADDED event, fire off everytime a child is updated.
// NOTE: this event also fire off at first page load for all current children. 

/*
database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});
*/
// this line above will run all current expenses in 'expenses'