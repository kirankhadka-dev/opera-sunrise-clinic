const TestModel = require("../models/Test");
const PatientModel = require("../models/Patient");
const DoctorModel = require("../models/Doctor");

// @desc Get all test results (Admin, Doctor, Lab Staff)
// @route GET /api/tests
const getAllTests = async (req, res) => {
  try {
    const tests = await TestModel.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name specialty");
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a specific test result (Admin, Doctor, Lab Staff, Patient)
// @route GET /api/tests/:id
const getTest = async (req, res) => {
  try {
    const test = await TestModel.findById(req.params.id)
      .populate("patientId", "name email")
      .populate("doctorId", "name specialty");

    if (!test)
      return res.status(404).json({ message: "Test result not found" });
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Record a new test result (Doctor, Lab Staff)
// @route POST /api/tests
const recordTest = async (req, res) => {
  try {
    const { patientId, doctorId, testType, date, result } = req.body;

    const patientExists = await PatientModel.findById(patientId);
    const doctorExists = await DoctorModel.findById(doctorId);
    if (!patientExists || !doctorExists)
      return res.status(404).json({ message: "Invalid Patient or Doctor ID" });

    const test = await TestModel.create({
      patientId,
      doctorId,
      testType,
      date,
      result,
    });
    res.status(201).json({ message: "Test recorded successfully", test });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update a test result (Doctor, Lab Staff)
// @route PUT /api/tests/:id
const updateTest = async (req, res) => {
  try {
    const test = await TestModel.findById(req.params.id);
    if (!test)
      return res.status(404).json({ message: "Test result not found" });

    Object.assign(test, req.body);
    await test.save();
    res.json({ message: "Test result updated successfully", test });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a test result (Admin Only)
// @route DELETE /api/tests/:id
const deleteTest = async (req, res) => {
  try {
    const test = await TestModel.findById(req.params.id);
    if (!test)
      return res.status(404).json({ message: "Test result not found" });

    await test.deleteOne();
    res.json({ message: "Test result deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { recordTest, getAllTests, getTest, deleteTest, updateTest };
