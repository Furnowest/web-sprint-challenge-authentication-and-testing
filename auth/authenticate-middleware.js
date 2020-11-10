/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };
const bcrypt =require("bcrypt")
const User =require("../models/users")

function restrict() {
	return async (req, res, next) => {
		try {
		
			if (!req.session || !req.session.user) {
				return res.status(401).json()
			}

			
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}