const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({});

const student_session = mongoose.model('Session', sessionSchema);

module.exports = student_session;