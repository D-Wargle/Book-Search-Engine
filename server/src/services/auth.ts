import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Define token payload
interface JwtPayload {
	_id: unknown;
	username: string;
	email: string;
}
//check if use r is logged in
export const authMiddleware = ({ req }: { req: any }) => {
	// Get token from request
	let token = req.body.token || req.query.token || req.headers.authorization;

	if (req.headers.authorization) {
		token = token.split(' ').pop().trim();
	}

	// If no token found, return request as is
	if (!token) {
		return req;
	}

	try {
		// Get our secret key for checking tokens
		const secretKey = process.env.JWT_SECRET_KEY || '';
		// Check if token is valid and get user info from it
		const { data } = jwt.verify(token, secretKey) as { data: JwtPayload };
		req.user = data;
	} catch {
		console.log('Invalid token');
	}

	return req;
};

// Create a new token when user logs in or signs up
export const signToken = (username: string, email: string, _id: unknown) => {
	const payload = { username, email, _id };
	const secretKey = process.env.JWT_SECRET_KEY || '';

	//return token
	return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};