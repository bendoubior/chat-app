const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const documents = {};
const messages = {};

io.on("connection", socket => {
  let previousId;

  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
    previousId = currentId;
  };

  socket.on("getDoc", docId => {
    safeJoin(docId);
    socket.emit("document", documents[docId]);
  });

  socket.on("addDoc", doc => {
    documents[doc.id] = doc;
    safeJoin(doc.id);
    io.emit("documents", Object.keys(documents));
    socket.emit("document", doc);
    console.log(doc.id);
  });

  socket.on("addMsg", msg => {
    messages[msg.id] = msg;
    safeJoin(msg.id);
    io.emit("messages", Object.keys(messages));
    io.emit("getMsg", msg);
    console.log(messages[msg.id]);
  });

  io.emit("documents", Object.keys(documents));

  console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
  console.log('Listening on port 4444');
});
