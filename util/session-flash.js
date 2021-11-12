function getSessionData(req) {
  const sessionData = req.session.flashData;

  req.session.flashData = null;

  return sessionData;
}

function flashDataSession(req, data, action) {
  req.session.flashData = data;
  req.session.dave(action);
}

module.exports = {
  getSessionData: getSessionData,
  flashDataSession: flashDataSession,
};
