import Student from "../models/Student.js";
import Config from "../models/Config.js";

/**
 * @desc    Register a new student application
 * @route   POST /api/students/register (or /api/users/register)
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    // 0. Check global recruitment open status control step
    try {
      const config = await Config.findOne({ key: "recruitment_config" });
      if (config && config.recruitmentOpenStatus === false) {
        return res.status(403).json({
          success: false,
          recruitmentOpenStatus: false,
          message: "Recruitment applications are currently closed. Stay tuned for joining the crew!",
          error: "Recruitment is currently closed.",
        });
      }
    } catch (configErr) {
      console.warn("Could not query recruitment config, proceeding with default open status:", configErr.message);
    }

    const {
      personalEmail,
      email,
      collegeEmail,
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
      !Name ||
      !department ||
      !year ||
      !section ||
      !mobileNumber ||
      !personalEmail ||
      !role ||
      !subRole
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, Mobile Number, Personal Email, Department, Section, Track, and Role are required.",
      });
    }

    const cleanMobile = mobileNumber.trim();
    const cleanPersonalEmail = personalEmail && typeof personalEmail === 'string' && personalEmail.trim() ? personalEmail.toLowerCase().trim() : null;
    const rawCollegeEmail = email || collegeEmail;
    const cleanCollegeEmail = rawCollegeEmail && typeof rawCollegeEmail === 'string' && rawCollegeEmail.trim() ? rawCollegeEmail.toLowerCase().trim() : null;
    const cleanRegNumber = regNumber && typeof regNumber === 'string' ? regNumber.trim().toUpperCase() : "";

    // Validate personal email must end with @gmail.com
    if (!cleanPersonalEmail || !cleanPersonalEmail.endsWith('@gmail.com')) {
      return res.status(400).json({
        success: false,
        message: "Personal email must be a valid @gmail.com address.",
      });
    }

    // Validate university email if provided
    if (cleanCollegeEmail && !cleanCollegeEmail.endsWith('@citchennai.net')) {
      return res.status(400).json({
        success: false,
        message: "Only official @citchennai.net university accounts are permitted.",
      });
    }

    // 2. Check if student already registered with mobile number, personal email, or (if provided) university email
    const duplicateQueries = [{ mobileNumber: cleanMobile }, { personalEmail: cleanPersonalEmail }];
    if (cleanCollegeEmail) {
      duplicateQueries.push({ email: cleanCollegeEmail });
    }

    const existingStudent = await Student.findOne({
      $or: duplicateQueries,
    });

    if (existingStudent) {
      let duplicateField = "Mobile number";
      if (existingStudent.personalEmail === cleanPersonalEmail) {
        duplicateField = "Personal email address";
      } else if (cleanCollegeEmail && existingStudent.email === cleanCollegeEmail) {
        duplicateField = "University email address";
      } else if (existingStudent.mobileNumber === cleanMobile) {
        duplicateField = "Mobile number";
      }

      return res.status(409).json({
        success: false,
        message: "Already registered",
        error: `A student with this ${duplicateField} has already registered.`,
      });
    }

    // 3. Create and store the new student record in Database
    const studentData = {
      Name: Name.trim(),
      department: department.trim(),
      year: (year || "1st Year").trim(),
      section: section.trim().toUpperCase(),
      mobileNumber: cleanMobile,
      personalEmail: cleanPersonalEmail,
      regNumber: cleanRegNumber,
      role,
      subRole,
      githubUrl: githubUrl ? githubUrl.trim() : "",
      linkedinUrl: linkedinUrl ? linkedinUrl.trim() : "",
    };

    if (cleanCollegeEmail) {
      studentData.email = cleanCollegeEmail;
    }

    const newStudent = new Student(studentData);
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
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: messages,
      });
    }

    // Handle MongoDB duplicate key error (code 11000)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      const fieldLabels = {
        mobileNumber: "Mobile number",
        personalEmail: "Personal email",
        email: "University email",
      };
      const label = fieldLabels[field] || field;

      return res.status(409).json({
        success: false,
        message: "Duplicate entry",
        error: `A student with this ${label} is already registered.`,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error. Could not register.",
      error: error.message,
    });
  }
};

/**
 * @desc    Check if a student is already registered by email, personalEmail, regNumber, or mobile
 * @route   POST /api/students/check
 * @access  Public
 */
export const checkStudentExists = async (req, res) => {
  try {
    const { email, personalEmail, collegeEmail, regNumber, mobileNumber } = req.body;

    const queries = [];
    const cleanPersonal = personalEmail && typeof personalEmail === 'string' && personalEmail.trim() ? personalEmail.toLowerCase().trim() : null;
    const cleanCollege = (collegeEmail || email) && typeof (collegeEmail || email) === 'string' && (collegeEmail || email).trim() ? (collegeEmail || email).toLowerCase().trim() : null;

    if (mobileNumber && mobileNumber.trim()) queries.push({ mobileNumber: mobileNumber.trim() });
    if (cleanPersonal) queries.push({ personalEmail: cleanPersonal });
    if (cleanCollege) queries.push({ email: cleanCollege });
    if (regNumber && regNumber.trim()) queries.push({ regNumber: regNumber.toUpperCase().trim() });

    if (queries.length === 0) {
      return res.status(200).json({
        success: true,
        exists: false,
        message: "No identifiers provided to check.",
      });
    }

    const existingStudent = await Student.findOne({ $or: queries });

    if (existingStudent) {
      let duplicateField = "Mobile number";
      if (cleanPersonal && existingStudent.personalEmail === cleanPersonal) {
        duplicateField = "Personal email address";
      } else if (cleanCollege && existingStudent.email === cleanCollege) {
        duplicateField = "University email address";
      } else if (mobileNumber && existingStudent.mobileNumber === mobileNumber.trim()) {
        duplicateField = "Mobile number";
      } else if (regNumber && existingStudent.regNumber === regNumber.toUpperCase().trim()) {
        duplicateField = "Register number";
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

