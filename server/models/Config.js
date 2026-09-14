import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "recruitment_config",
    },
    recruitmentOpenStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
