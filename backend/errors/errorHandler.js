exports.error_custom = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    msg: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

exports.error_pathNotFound = (req, res, next) => {

  res.status(404).send({msg: "Path Not Found"});
}

exports.error_badRequest = (err, req, res, next) => {


}
