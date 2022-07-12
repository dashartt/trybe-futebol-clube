const errors = {
  invalidLoginData: {
    status: 400,
    message: 'All fields must be filled',
  },
  userNotFound: {
    status: 401,
    message: 'Incorrect email or password',
  },
  invalidToken: {
    status: 401,
    message: 'Token must be a valid token',
  },
  invalidMatch: {
    status: 401,
    message: 'It is not possible to create a match with two equal teams',
  },
  invalidTeam: {
    status: 404,
    message: 'There is no team with such id!',
  },
};

export default errors;
