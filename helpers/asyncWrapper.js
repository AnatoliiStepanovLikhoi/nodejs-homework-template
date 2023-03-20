const asyncWrapper = controller => {
  return (req, res, next) => {
    controller(req, res, next).catch(error => next(error));
  };
};

module.exports = asyncWrapper;
