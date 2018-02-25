const net = require("net");
const PORT = 6969;

const client = net.connect(PORT, "0.0.0.0", () => {
  let USER = client.remoteAddress + ": " + client.remotePort;
  //writes to server
  process.stdin.on("data", data => {
    client.write(data);
  });
  client.on("data", data => {
    console.log(data);
  });
});

// client.on("end", () => {
//   console.log(`${USER} has disconnected`);
// });
client.on("error", error => console.log(error));
