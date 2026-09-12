import Student from "../models/Student.js";

/**
 * @desc    Register a new student application
 * @route   POST /api/students/register (or /api/users/register)
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const {
      email,
      Name,
      department,
      year,
      section,
      mobileNumber,
      regNumber,
      role,
      subRole,
      githubUrl,
      linkedinUrl,
    } = req.body;

    // 1. Basic validation for required fields
    if (
      !email ||
      !Name ||
      !department ||
      !year ||
      !section ||
      !mobileNumber ||
      !regNumber ||
      !role ||
      !subRole ||
      !githubUrl ||
      !linkedinUrl
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanMobile = mobileNumber.trim();
    const cleanRegNumber = regNumber.trim().toUpperCase();

    // 2. Check if student already registered with email, mobile number, or register number
    const existingStudent = await Student.findOne({
      $or: [
        { email: cleanEmail },
        { mobileNumber: cleanMobile },
        { regNumber: cleanRegNumber },
      ],
    });

    if (existingStudent) {
      let duplicateField = "Email or Phone number";
      if (existingStudent.email === cleanEmail) {
        duplicateField = "Email address";
      } else if (existingStudent.mobileNumber === cleanMobile) {
        duplicateField = "Mobile number";
      } else if (existingStudent.regNumber === cleanRegNumber) {
        duplicateField = "Register number";
      }

      return res.status(409).json({
        success: false,
        message: "Already registered",
        error: `A student with this ${duplicateField} has already registered.`,
      });
    }

    // 3. Create and store the new student record in Database
    const newStudent = new Student({
      email: cleanEmail,
      Name: Name.trim(),
      department: department.trim(),
      year: year.trim(),
      section: section.trim().toUpperCase(),
      mobileNumber: cleanMobile,
      regNumber: cleanRegNumber,
      role,
      subRole,
      githubUrl: githubUrl.trim(),
      linkedinUrl: linkedinUrl.trim(),
    });

    const savedStudent = await newStudent.save();

    // 4. Send success response
    return res.status(201).json({
      success: true,
      message: "Response successfully received",
      data: savedStudent,
    });
  } catch (error) {
    console.error("Error registering student:", error);

    // Handle Mongoose validation errors gracefully
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error. Failed to submit registration.",
      error: error.message,
    });
  }
};

/**
 * @desc    Check if a student is already registered by email, regNumber, or mobile
 * @route   POST /api/students/check
 * @access  Public
 */
export const checkStudentExists = async (req, res) => {
  try {
    const { email, regNumber, mobileNumber } = req.body;

    const queries = [];
    if (email) queries.push({ email: email.toLowerCase().trim() });
    if (regNumber) queries.push({ regNumber: regNumber.toUpperCase().trim() });
    if (mobileNumber) queries.push({ mobileNumber: mobileNumber.trim() });

    if (queries.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one identifier (email, regNumber, mobileNumber) must be provided.",
      });
    }

    const existingStudent = await Student.findOne({ $or: queries });

    if (existingStudent) {
      let duplicateField = "Email";
      if (email && existingStudent.email === email.toLowerCase().trim()) {
        duplicateField = "Email address";
      } else if (regNumber && existingStudent.regNumber === regNumber.toUpperCase().trim()) {
        duplicateField = "Register number";
      } else if (mobileNumber && existingStudent.mobileNumber === mobileNumber.trim()) {
        duplicateField = "Mobile number";
      }

      return res.status(200).json({
        success: true,
        exists: true,
        message: `A candidate with this ${duplicateField} has already registered.`,
        field: duplicateField
      });
    }

    return res.status(200).json({
      success: true,
      exists: false,
      message: "No existing registration found."
    });
  } catch (error) {
    console.error("Error checking student existence:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify registration status.",
      error: error.message
    });
  }
};

