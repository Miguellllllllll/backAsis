const mongoose = require('mongoose');

const formatDateTime = (date) => {
    const formatDateTime = (date) => {
  const options = { timeZone: 'America/Lima', hour12: true, year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('es-PE', options).format(date).replace(',', ' -');
};

};
const generateId = () => {
  return Math.floor(1000 + Math.random() * 9000); // Genera un número de 4 dígitos
};

const attendanceSchema = new mongoose.Schema({
  _id: { type: Number, default: generateId },
  name: { type: String, required: true },
  dateTime: { 
    type: String, 
    default: () => formatDateTime(new Date()) 
  }
});

attendanceSchema.index({ name: 1, dateTime: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
