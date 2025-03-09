const AppointmentModel = require("../models/Appointment.js");
const PatientModel = require("../models/Patient.js");
const DoctorModel = require("../models/Doctor.js");

// @desc Get all appointments (Admin, Receptionist, Doctor Only)
// @route GET /api/appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name specialty");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a specific appointment (Admin, Receptionist, Doctor, Patient)
// @route GET /api/appointments/:id
const getAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id)
      .populate("patientId", "name email")
      .populate("doctorId", "name specialty");
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Book a new appointment (Admin, Receptionist, Patient)
// @route POST /api/appointments
const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, purpose } = req.body;

    const patientExists = await PatientModel.findById(patientId);
    const doctorExists = await DoctorModel.findById(doctorId);
    if (!patientExists || !doctorExists)
      return res.status(404).json({ message: "Invalid Patient or Doctor ID" });

    const appointment = await AppointmentModel.create({
      patientId,
      doctorId,
      date,
      time,
      purpose,
    });
    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update an appointment (Admin, Receptionist Only)
// @route PUT /api/appointments/:id
const updateAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    Object.assign(appointment, req.body);
    await appointment.save();
    res.json({ message: "Appointment updated successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Cancel an appointment (Admin, Receptionist Only)
// @route DELETE /api/appointments/:id
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    await appointment.deleteOne();
    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  cancelAppointment,
  updateAppointment,
  bookAppointment,
  getAllAppointments,
  getAppointment,
};
