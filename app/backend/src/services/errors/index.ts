const errors = {
  invalidLoginData: { status: 400, message: 'All fields must be filled' },
  userNotFound: { status: 401, message: 'Incorrect email or password' },
  invalidToken: { status: 401, message: 'Token must be a valid token' },
};

export default errors;
