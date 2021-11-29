const isUserLoggedIn = (cookieID, db) => {
  return db.getUserById(cookieID).then((dbusr) => {
    return dbusr ? true : false;
  });
};

module.exports = isUserLoggedIn;
