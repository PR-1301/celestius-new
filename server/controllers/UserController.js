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
