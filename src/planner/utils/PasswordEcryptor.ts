const bcrypt = require("bcryptjs");

export class PasswordEncryptor {
  static async encryptPassword(password): Promise<string> {
    if (!password) {
      throw Error("empty password encryption is not supported");
    }
    // const password = "mypass123";
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, function (saltError, salt) {
        if (saltError) {
          // throw saltError;
          reject(`salt error: ${JSON.stringify(saltError)}`);
        } else {
          bcrypt.hash(password, salt, function (hashError, hash) {
            if (hashError) {
              // throw hashError;
              reject(`hash error: ${JSON.stringify(hashError)}`);
            } else {
              resolve(hash);
              //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
            }
          });
        }
      });
    });
  }

  static comparePassword(plainPassword, hash): Promise<Boolean> {
    //     const passwordEnteredByUser = "mypass123"
    // const hash = "$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K"
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, hash, function (error, isMatch) {
        if (error) {
          // throw error;
          reject(JSON.stringify(error));
        } else if (!isMatch) {
          console.debug("Password doesn't match!");
          resolve(false);
        } else {
          console.debug("Password matches!");
          resolve(true);
        }
      });
    });
  }
}
