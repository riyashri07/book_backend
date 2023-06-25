const Token = (res, stausCode, user) => {
  const token = user.getjwtToken();

  res.status(stausCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = Token;
