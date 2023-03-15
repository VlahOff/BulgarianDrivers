const jwt = require('jsonwebtoken');

module.exports = () => async (req, res, next) => {
	const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
	const token = req.headers['x-authorization'];
	console.log(req.headers);

	if (token) {
		try {
			const payload = jwt.verify(token, JWT_SECRET_TOKEN);

			console.log(payload);
			req.user = payload;
			req.token = token;
		} catch (error) {
			return res.status(401).json({ message: 'INVALID_TOKEN' });
		}
	}

	next();
};