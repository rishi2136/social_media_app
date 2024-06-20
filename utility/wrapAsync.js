function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);  //async function that passed in wrapAsync is executed its next inside the catch
  };
}

module.exports = wrapAsync; 