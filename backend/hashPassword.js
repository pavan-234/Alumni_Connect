const bcrypt = require('bcrypt');

const password = 'alice123';
bcrypt.hash(password, 10).then(hash => {
  console.log('Hashed Password:', hash);
});
