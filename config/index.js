require('dotenv').config();

const email = process.env.email;
const password = process.env.password;
const wakatech = process.env.wakatech_id;
module.exports = { email, password , wakatech};
