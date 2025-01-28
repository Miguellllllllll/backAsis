const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const ExcelJS = require('exceljs');

router.post('/add', async (req, res) => {
  const { name } = req.body;
  const newAttendance = new Attendance({ name });

  try {
    await newAttendance.save();
    res.status(201).send('Attendance recorded');
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send('Duplicate attendance record');
    } else {
      res.status(400).send('Error recording attendance');
    }
  }
});

router.get('/all', async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.status(200).json(attendances);
  } catch (err) {
    res.status(400).send('Error fetching attendances');
  }
});

router.get('/download', async (req, res) => {
  try {
    const attendances = await Attendance.find();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Asistencias');

    worksheet.columns = [
      { header: 'ID', key: '_id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Fecha y Hora', key: 'dateTime', width: 20 }
    ];

    attendances.forEach(attendance => {
      attendance.dateTime = new Date(attendance.dateTime).toLocaleString();
      worksheet.addRow(attendance);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=asistencias.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).send('Error generating Excel file');
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, dateTime } = req.body;
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { name, dateTime },
      { new: true }
    );
    res.status(200).json(updatedAttendance);
  } catch (err) {
    res.status(400).send('Error updating attendance');
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Attendance.findByIdAndDelete(id);
    res.status(200).send('Attendance deleted');
  } catch (err) {
    res.status(400).send('Error deleting attendance');
  }
});

module.exports = router;
