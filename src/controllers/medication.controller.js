const MedicationModel = require("../models/Medication");
const PatientModel = require("../models/Patient");
const DoctorModel = require("../models/Doctor");

// @desc Get all medications (Admin, Doctor, Pharmacist)
// @route GET /api/medications
const getAllMedications = async (req, res) => {
  try {
    const medications = await MedicationModel.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name specialty");
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a specific medication (Admin, Doctor, Pharmacist, Patient)
// @route GET /api/medications/:id
const getMedication = async (req, res) => {
  try {
    const medication = await MedicationModel.findById(req.params.id)
      .populate("patientId", "name email")
      .populate("doctorId", "name specialty");

    if (!medication)
      return res.status(404).json({ message: "Medication not found" });
    res.json(medication);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Prescribe medication (Doctor Only)
// @route POST /api/medications
const prescribeMedication = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      medicationName,
      dosage,
      instructions,
      startDate,
      endDate,
    } = req.body;

    const patientExists = await PatientModel.findById(patientId);
    const doctorExists = await DoctorModel.findById(doctorId);
    if (!patientExists || !doctorExists)
      return res.status(404).json({ message: "Invalid Patient or Doctor ID" });

    const medication = await MedicationModel.create({
      patientId,
      doctorId,
      medicationName,
      dosage,
      instructions,
      startDate,
      endDate,
    });
    res
      .status(201)
      .json({ message: "Medication prescribed successfully", medication });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update medication details (Doctor, Pharmacist)
// @route PUT /api/medications/:id
const updateMedication = async (req, res) => {
  try {
    const medication = await MedicationModel.findById(req.params.id);
    if (!medication)
      return res.status(404).json({ message: "Medication not found" });

    Object.assign(medication, req.body);
    await medication.save();
    res.json({ message: "Medication updated successfully", medication });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a medication record (Admin Only)
// @route DELETE /api/medications/:id
const deleteMedication = async (req, res) => {
  try {
    const medication = await MedicationModel.findById(req.params.id);
    if (!medication)
      return res.status(404).json({ message: "Medication not found" });

    await medication.deleteOne();
    res.json({ message: "Medication record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  deleteMedication,
  updateMedication,
  getAllMedications,
  getMedication,
  prescribeMedication,
};
