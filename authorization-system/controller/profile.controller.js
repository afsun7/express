function getProfile(req, res, next) {
  return res.status(200).json({
    success: true,
    message: "Profile retrieved successfully",
    data: req.user
  });
}

module.exports = {
  getProfile,
};
