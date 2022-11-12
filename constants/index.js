const NOT_FOUND = 'NotFound';
const CAST_ERROR = 'CastError';
const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;
const JWT_SECRET = '5066e19ca0f3f2521d7c7ef07d99c7307c5533cea846d26f4b9408932f1fc99f';
module.exports = {
  NOT_FOUND, CAST_ERROR, JWT_SECRET, regex,
};
