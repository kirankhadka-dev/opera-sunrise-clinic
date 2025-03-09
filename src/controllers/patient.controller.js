import PatientModal from "../models/Patient.model.js";
import UserModal from "../models/User.model.js";
// @desc Get all patients (Admin & Receptionist Only)
// @route GET /api/patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await PatientModal.find().populate(
      "userId",
      "name email role"
    );
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a specific patient (Admin, Receptionist & Doctor)
// @route GET /api/patients/:id
const getPatient = async (req, res) => {
  try {
    const patient = await PatientModal.findById(req.params.id).populate(
      "userId",
      "name email role"
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Register a new patient (Admin & Receptionist Only)
// @route POST /api/patients
const registerPatient = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      contactInfo,
      address,
      dateOfBirth,
      bloodType,
    } = req.body;

    // Check if user exists
    const userExists = await UserModal.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Create user entry (role = patient)
    const user = await UserModal.create({
      name,
      email,
      password,
      role: "patient",
      contactInfo,
      address,
      dateOfBirth,
    });

    // Create patient record
    const patient = await PatientModal.create({ userId: user._id, bloodType });

    res
      .status(201)
      .json({ message: "Patient registered successfully", patient });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update patient details (Admin & Receptionist Only)
// @route PUT /api/patients/:id
exports.updatePatient = async (req, res) => {
  try {
    const patient = await PatientModal.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // Update patient fields
    Object.assign(patient, req.body);
    await patient.save();

    res.json({ message: "Patient updated successfully", patient });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a patient (Admin Only)
// @route DELETE /api/patients/:id
exports.deletePatient = async (req, res) => {
  try {
    const patient = await PatientModal.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    await patient.deleteOne();
    await UserModal.findByIdAndDelete(patient.userId);

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
