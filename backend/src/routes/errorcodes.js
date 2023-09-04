const errorCodes = {
    SUCCESSFUL: 200,
    DELETED: 204,
    CREATED: 201,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INVALID_VALUE: 422,
    BAD_REQUEST: 400,
};

const errors = (status) => errorCodes[status] || 500;

module.exports = errors;