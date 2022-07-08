const errors = {
  invalidLoginData: { status: 400, message: 'All fields must be filled' },
  userNotFound: { status: 401, message: 'Incorrect email or password' },
};

export default errors;
