const net = require("net");
const PORT = 6969;
const userList = [];
let newName;

const server = net.createServer(client => {
  userList.push(client); //adding to userList arr
  let USER = client.remoteAddress + ": " + client.remotePort;
  //Text startup for Client
  broadcast(" has joined", USER);
  client.write("\n");
  client.write(`Welcome, you are user ${USER} \n`); //shows to client as welcome message
  client.write("\n");
  client.write("To change your user, type $desiredname \n");
  client.write("\n");

  server.getConnections((err, count) => {
    //count users connected
    console.log(count + " users connected");
  });
  client.on("data", data => {
    //build clients in node
    data = data.toString();
    userList.forEach(client => {
      if (client === USER) {
        return;
      } //don't send to self
      client.write(data);
    });
    console.log(USER + ":" + data);
    // if (data.charAt(0) === "$") {
    //   //changing user name
    //   let newNameHolder = [];
    //   for (var i = 1; i < data.length; i++) {
    //     newNameHolder.push(data[i]);
    //   }
    //   newName = newNameHolder.join("");
    //   if (newName.toLowerCase() === "admin") {
    //     //cannot set name to admin
    //     client.write("You cannot be an admin!");
    //     return;
    //   } else {
    //     client.write("You are now " + newName);
    //     userList.push(newName);
    //     return newName;
    //   }
    // }

    // if (typeof newName === "string") {
    //   broadcast(data, newName);
    // } else {
    //   broadcast(data, USER);
    // }
  });

  //   client.on("end", () => {
  //     server.client.splice(server.client.indexOf(client), 1);
  //     console.log(USER + newName + " disconnected from server");
  //   });
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
  console.log(`Server is listening to connections on: ${PORT}`);
});

server.on("error", err => {
  throw err;
});
const broadcast = (message, sender) => {
  userList.forEach(client => {
    if (client === sender) {
      return;
    } //don't send to self
    client.write(message);
  });
  console.log(sender + ":" + message);
};
