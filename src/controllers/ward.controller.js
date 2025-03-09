const WardModel = require("../models/Ward");
const BedModel = require("../models/Bed");
const PatientModel = require("../models/Patient");

// @desc Get all wards (Admin, Receptionist)
// @route GET /api/wards
const getAllWards = async (req, res) => {
  try {
    const wards = await WardModel.find();
    res.json(wards);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a specific ward
// @route GET /api/wards/:id
const getWard = async (req, res) => {
  try {
    const ward = await WardModel.findById(req.params.id);
    if (!ward) return res.status(404).json({ message: "Ward not found" });
    res.json(ward);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Add a new ward (Admin Only)
// @route POST /api/wards
const addWard = async (req, res) => {
  try {
    const ward = await WardModel.create(req.body);
    res.status(201).json({ message: "Ward added successfully", ward });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update a ward (Admin Only)
// @route PUT /api/wards/:id
const updateWard = async (req, res) => {
  try {
    const ward = await WardModel.findById(req.params.id);
    if (!ward) return res.status(404).json({ message: "Ward not found" });

    Object.assign(ward, req.body);
    await ward.save();
    res.json({ message: "Ward updated successfully", ward });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a ward (Admin Only)
// @route DELETE /api/wards/:id
const deleteWard = async (req, res) => {
  try {
    const ward = await WardModel.findById(req.params.id);
    if (!ward) return res.status(404).json({ message: "Ward not found" });

    await ward.deleteOne();
    res.json({ message: "Ward deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get all beds (Admin, Receptionist)
// @route GET /api/beds
const getAllBeds = async (req, res) => {
  try {
    const beds = await BedModel.find().populate("wardId", "name");
    res.json(beds);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a specific bed
// @route GET /api/beds/:id
const getBed = async (req, res) => {
  try {
    const bed = await BedModel.findById(req.params.id).populate(
      "wardId",
      "name"
    );
    if (!bed) return res.status(404).json({ message: "Bed not found" });
    res.json(bed);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Assign a bed to a patient (Admin, Receptionist)
// @route POST /api/beds
const assignBed = async (req, res) => {
  try {
    const { wardId, patientId, status } = req.body;
    const patientExists = await PatientModel.findById(patientId);
    if (!patientExists)
      return res.status(404).json({ message: "Invalid Patient ID" });

    const bed = await BedModel.create({ wardId, patientId, status });
    res.status(201).json({ message: "Bed assigned successfully", bed });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update bed assignment (Admin, Receptionist)
// @route PUT /api/beds/:id
const updateBedAssignment = async (req, res) => {
  try {
    const bed = await BedModel.findById(req.params.id);
    if (!bed) return res.status(404).json({ message: "Bed not found" });

    Object.assign(bed, req.body);
    await bed.save();
    res.json({ message: "Bed assignment updated successfully", bed });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Remove bed assignment (Admin Only)
// @route DELETE /api/beds/:id
const removeBedAssignment = async (req, res) => {
  try {
    const bed = await BedModel.findById(req.params.id);
    if (!bed) return res.status(404).json({ message: "Bed not found" });

    await bed.deleteOne();
    res.json({ message: "Bed assignment removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  removeBedAssignment,
  updateBedAssignment,
  assignBed,
  getAllBeds,
  getAllWards,
  getBed,
  deleteWard,
  addWard,
  getWard,
  updateWard,
};
