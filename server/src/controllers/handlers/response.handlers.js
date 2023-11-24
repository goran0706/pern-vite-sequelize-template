const stripObject = (object, ...props) => {
    if (typeof object !== 'object' || object === null) {
        return object; // Return the object unchanged if it's not an object
    }
    if ('dataValues' in object) {
        object.dataValues = stripObject(object.dataValues, ...props);
    }
    props.forEach((prop) => delete object[prop]);
    return object;
};

const getResponseObject = (success, error, data) => ({success, error, data});

export const handleResponse = (status, success, error, data, res) => {
    const stripped = stripObject(data, 'password', 'passwordHashed');
    const response = getResponseObject(success, error, stripped);
    res.status(status).json(response);
};
