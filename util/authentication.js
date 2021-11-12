// ... Create User Session for login authentication & save user in Session Locals
function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.save(action);
}

// ... Set Usere to logout authentication & delete user in Session Locals
function destroyUserAuthSession(req) {
  req.session.uid = null;
}

module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
