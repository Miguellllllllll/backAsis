const mongoose = require('mongoose');

const moment = require('moment-timezone');

// Almacenar en UTC
const fechaUTC = moment().utc();  // Almacena la hora en UTC
console.log(fechaUTC.format()); 
const fechaLocal = fechaUTC.tz('America/Lima').format('DD/MM/YY hh:mm');
const generateId = () => {
  return Math.floor(1000 + Math.random() * 9000); // Genera un número de 4 dígitos
};

const attendanceSchema = new mongoose.Schema({
    _id: { type: Number, default: generateId },
    name: { type: String, required: true },
    dateTime: { 
    type: String, 
    default: () => fechaLocal 
    }
});

attendanceSchema.index({ name: 1, dateTime: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
