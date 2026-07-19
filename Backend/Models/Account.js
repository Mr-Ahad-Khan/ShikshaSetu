const { Schema, model } = require("mongoose");

const accountSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user", required: true },
  },
  { timestamps: true },
);

accountSchema.set("toJSON", {
  versionKey: false,
  transform: (_document, returned) => {
    returned.id = returned._id.toString();
    delete returned._id;
    delete returned.passwordHash;
  },
});

module.exports = model("Account", accountSchema);
