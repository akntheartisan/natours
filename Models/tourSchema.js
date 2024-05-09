const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tourSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: true,
    },
    images: [String],
    startDate: [Date],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tour', tourSchema);
