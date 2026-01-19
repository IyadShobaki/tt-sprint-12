const setNoCacheHeaders = (req, res, next) => {
  //res.header({ "Cache-Control": "no-store" });
  res.set("Cache-Control", "no-store");
  next();
};

module.exports = {
  setNoCacheHeaders,
};
