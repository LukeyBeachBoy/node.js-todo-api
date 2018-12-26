const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const data = {
//   id: 10
// };

// const password = '123abc!';
const hashedPassword = '$2a$10$0AyfFdYuwyhgniccKft6Vuw6l3cyUmG1XiCmL98N7MCEwXD4ENuSS';

// let salt = bcrypt.genSalt(undefined, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

bcrypt
  .compare('123abc!', hashedPassword)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log(`Decoded: ${JSON.stringify(decoded, undefined, 2)}`);

// / MUCH MORE EFFICIENT ^

// var message = "I am user number 3";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}\nHash: ${hash}`);

// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "someSecret").toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + "someSecret").toString();
// if (resultHash === token.hash) {
//   console.log("Data was not changed");
// } else {
//     console.log("Data was changed, don't trust!");
// }
