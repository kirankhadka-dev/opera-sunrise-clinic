const DiagnosisModel = require("../models/Diagnosis");
const PatientModel = require("../models/Patient");
const DoctorModel = require("../models/Doctor");

// @desc Get all diagnoses (Admin, Doctor Only)
// @route GET /api/diagnoses
const getAllDiagnoses = async (req, res) => {
  try {
    const diagnoses = await DiagnosisModel.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name specialty");
    res.json(diagnoses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a specific diagnosis (Admin, Doctor, Patient)
// @route GET /api/diagnoses/:id
const getDiagnosis = async (req, res) => {
  try {
    const diagnosis = await DiagnosisModel.findById(req.params.id)
      .populate("patientId", "name email")
      .populate("doctorId", "name specialty");

    if (!diagnosis)
      return res.status(404).json({ message: "Diagnosis not found" });

    res.json(diagnosis);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Record a new diagnosis (Doctor Only)
// @route POST /api/diagnoses
const recordDiagnosis = async (req, res) => {
  try {
    const { patientId, doctorId, diagnosisDate, notes } = req.body;

    const patientExists = await PatientModel.findById(patientId);
    const doctorExists = await DoctorModel.findById(doctorId);
    if (!patientExists || !doctorExists)
      return res.status(404).json({ message: "Invalid Patient or Doctor ID" });

    const diagnosis = await DiagnosisModel.create({
      patientId,
      doctorId,
      diagnosisDate,
      notes,
    });
    res
      .status(201)
      .json({ message: "Diagnosis recorded successfully", diagnosis });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update a diagnosis (Doctor Only)
// @route PUT /api/diagnoses/:id
const updateDiagnosis = async (req, res) => {
  try {
    const diagnosis = await DiagnosisModel.findById(req.params.id);
    if (!diagnosis)
      return res.status(404).json({ message: "Diagnosis not found" });

    Object.assign(diagnosis, req.body);
    await diagnosis.save();

    res.json({ message: "Diagnosis updated successfully", diagnosis });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a diagnosis (Admin Only)
// @route DELETE /api/diagnoses/:id
const deleteDiagnosis = async (req, res) => {
  try {
    const diagnosis = await DiagnosisModel.findById(req.params.id);
    if (!diagnosis)
      return res.status(404).json({ message: "Diagnosis not found" });

    await diagnosis.deleteOne();
    res.json({ message: "Diagnosis deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  deleteDiagnosis,
  updateDiagnosis,
  getAllDiagnoses,
  getDiagnosis,
  recordDiagnosis,
};
