import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      index: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return typeof v === "string" && v.endsWith("@citchennai.net");
        },
        message: "Only @citchennai.net university accounts are permitted.",
      },
    },
    Name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    year: {
      type: String,
      default: "1st Year",
      required: [true, "Year is required"],
      trim: true,
    },
    section: {
      type: String,
      trim: true,
      uppercase: true,
      required: [true, "Section is required"],
    },
    mobileNumber: {
      type: String,
      trim: true,
      required: [true, "Mobile number is required"],
    },
    regNumber: {
      type: String,
      trim: true,
      required: [true, "Register number is required"],
    },
    role: {
      type: String,
      required: [true, "Role category is required"],
      enum: {
        values: ["Tech", "Non-Tech"],
        message: '{VALUE} is not a valid role. Allowed options: "Tech" or "Non-Tech".',
      },
    },
    subRole: {
      type: String,
      required: [true, "Specific role is required"],
      validate: {
        validator: function (value) {
          if (this.role === "Tech") {
            return ["Backend Developer", "Frontend Developer"].includes(value);
          }
          if (this.role === "Non-Tech") {
            return ["Public speaking", "Events", "Design"].includes(value);
          }
          return false;
        },
        message: function (props) {
          if (this.role === "Tech") {
            return `"${props.value}" is not valid for Tech role. Allowed: Backend Developer, Frontend Developer.`;
          }
          if (this.role === "Non-Tech") {
            return `"${props.value}" is not valid for Non-Tech role. Allowed: Public speaking, Events, Design.`;
          }
          return `Invalid role category or sub-role combination.`;
        },
      },
    },
    githubUrl: {
      type: String,
      trim: true,
      required: [true, "GitHub URL is required"],
    },
    linkedinUrl: {
      type: String,
      trim: true,
      required: [true, "LinkedIn URL is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);

 