const mongoose = require('mongoose');

const generateId = () => {
  return Math.floor(1000 + Math.random() * 9000); // Genera un número de 4 dígitos
};

const userSchema = new mongoose.Schema({
    _id: { type: Number, default: generateId },
    name: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
