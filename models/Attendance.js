const mongoose = require('mongoose');

const formatDateTime = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    const yy = String(date.getFullYear()).slice(-2);
    
    let hh = date.getHours();
    const min = String(date.getMinutes()).padStart(2, '0');
    const ampm = hh >= 12 ? 'PM' : 'AM'; // Determinar AM o PM
    hh = hh % 12 || 12; // Convertir 0-23h a 12h formato (0 → 12, 13 → 1)

    return `${dd}/${mm}/${yy} - ${hh}:${min} ${ampm}`;
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
