import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    personalEmail: {
      type: String,
      required: [true, "Personal email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          if (!v) return false;
          return typeof v === "string" && v.endsWith("@gmail.com");
        },
        message: "Personal email must be a valid @gmail.com address.",
      },
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // Optional field
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
      unique: true,
      index: true,
    },
    regNumber: {
      type: String,
      trim: true,
      required: false,
      default: "",
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
            return ["Public speaking", "Events", "Design", "Editor"].includes(value);
          }
          return false;
        },
        message: function (props) {
          if (this.role === "Tech") {
            return `"${props.value}" is not valid for Tech role. Allowed: Backend Developer, Frontend Developer.`;
          }
          if (this.role === "Non-Tech") {
            return `"${props.value}" is not valid for Non-Tech role. Allowed: Public speaking, Events, Design, Editor.`;
          }
          return `Invalid role category or sub-role combination.`;
        },
      },
    },
    githubUrl: {
      type: String,
      trim: true,
      required: false,
      default: "",
    },
    linkedinUrl: {
      type: String,
      trim: true,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure sparse unique index for optional email and personal email
StudentSchema.index({ email: 1 }, { unique: true, sparse: true });
StudentSchema.index({ personalEmail: 1 }, { unique: true, sparse: true });

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);

 