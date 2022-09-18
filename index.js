exports.serverlessFunction = (req, res) => {
  let message = req.query.message || "Local Cloud Function";
  res.status(200).send(message);
};
