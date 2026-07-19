const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    category: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_document, returned) => {
    returned.id = returned._id.toString();
    delete returned._id;
  },
});

module.exports = model("Product", productSchema);
