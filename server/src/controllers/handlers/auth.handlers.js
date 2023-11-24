import User from '../../models/user.model.js';
import {generateToken} from '../../utilities/auth.utils.js';
import {attachCookie} from './cookie.handlers.js';
import {handleResponse} from './response.handlers';
import {handleError} from './error.handlers.js';

export const handleAuthentication = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return handleResponse(401, false, 'Invalid credentials', null, res);
        }

        const user = await User.findOne({
            where: {email},
            attributes: {include: ['passwordHashed']},
        });
        if (!user) {
            return handleResponse(401, false, 'Invalid credentials', null, res);
        }

        const passwordMatched = await user.authenticate(password);
        if (!passwordMatched) {
            return handleResponse(401, false, 'Invalid credentials', null, res);
        }

        const payload = {id: user.id, email: user.email, role: user.role};
        const [accessToken, data] = generateToken(payload);

        attachCookie(accessToken, res);
        handleResponse(200, true, null, data, res);
    } catch (error) {
        handleError(error, res);
    }
};
