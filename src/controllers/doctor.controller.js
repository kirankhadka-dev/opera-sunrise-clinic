import UserModal from "../models/User.model.js";
import DocterModal from "../models/Doctor.model.js";
import DoctorModal from "../models/Doctor.model.js";
// @desc Get all doctors (Admin Only)
// @route GET /api/doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModal.find().populate(
      "userId",
      "name email role"
    );
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a specific doctor (Admin & Doctor Only)
// @route GET /api/doctors/:id
const getDoctor = async (req, res) => {
  try {
    const doctor = await DoctorModal.findById(req.params.id).populate(
      "userId",
      "name email role"
    );
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Register a new doctor (Admin Only)
// @route POST /api/doctors
const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, contactInfo, address, specialty } = req.body;

    // Check if user exists
    const userExists = await UserModal.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Create user entry (role = doctor)
    const user = await UserModal.create({
      name,
      email,
      password,
      role: "doctor",
      contactInfo,
      address,
    });

    // Create doctor record
    const doctor = await DoctorModal.create({ userId: user._id, specialty });

    res.status(201).json({ message: "Doctor registered successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update doctor details (Admin Only)
// @route PUT /api/doctors/:id
const updateDoctor = async (req, res) => {
  try {
    const doctor = await DoctorModal.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Update doctor fields
    Object.assign(doctor, req.body);
    await doctor.save();

    res.json({ message: "Doctor updated successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a doctor (Admin Only)
// @route DELETE /api/doctors/:id
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await DoctorModal.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    await doctor.deleteOne();
    await User.findByIdAndDelete(doctor.userId);

    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { deleteDoctor, updateDoctor, registerDoctor, getAllDoctors, getDoctor };
