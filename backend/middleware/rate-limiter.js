/** Import express-rate-limit */
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, /** 15 minutes delay */
	max: 100, /** Requests limit by delay period */ 
	message: "Too many connections. Retry later !",
	standardHeaders: true,
});

module.exports = limiter;