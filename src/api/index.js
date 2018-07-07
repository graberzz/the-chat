import db, { firebase } from './firebase';

const messagesRef = db.ref('messages');
const typersRef = db.ref('typing');
const roomsRef = db.ref('rooms');

const auth = firebase.auth();
auth.useDeviceLanguage();
const provider = new firebase.auth.GoogleAuthProvider();

const getUser = googleUser => ({
  username: googleUser.displayName,
  email: googleUser.email,
  avatar: googleUser.photoURL
});

export const onAuthChange = (onSignIn, onSignOut) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      onSignIn(getUser(user));
    } else {
      onSignOut();
    }
  });
};

export const login = () =>
  new Promise((res, rej) => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        res(getUser(user));
      })
      .catch(rej);
  });

export const logout = () => {
  return auth.signOut();
};

export const sendMessage = (user, message, roomId, onError) => {
  messagesRef.push().set(
    {
      user,
      message,
      roomId,
      timestamp: Date.now(),
    }, onError);
};

export const addRoom = (name, creator = 'Cthulhu', onError) => {
  roomsRef.push().set({
    name,
    creator,
  }, onError);
}

export const watchRooms = (callback) => {
  roomsRef.on('child_added', (data) => callback({
    ...data.val(),
    id: data.key,
  }));
}

export const watchNewMessages = (timestamp, callback) => {
  messagesRef.on('child_added', (data) => {
    const msg = data.val();

    // skip messages older than timestamp
    if (msg.timestamp < timestamp) return;

    callback({
      ...msg,
      id: data.key,
    });
  });
};

export const getRoomMessages = (roomId) => new Promise((res, rej) => {
  messagesRef
    .orderByChild('roomId')
    .equalTo(roomId)
    .once('value', (snap) => res(snap.val() || {}));
});

export const setTyping = (username, roomId, unsetTimeout) => {
  typersRef.child(roomId).child(username).set({
    username
  });

  return setTimeout(() => unsetTyping(username, roomId), unsetTimeout);
};

export const unsetTyping = (username, roomId) => {
  typersRef.child(roomId).child(username).remove();
};

export const watchTypers = (callback) => {
  typersRef.on('value', (snap) => {
    callback(snap.val());
  });
};