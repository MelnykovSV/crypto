import mongoose from "mongoose";
const isPositive = (value: number) => {
  return value > 0;
};

const TransactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["sell", "buy", "exchange"],
      required: true,
    },
    isSuccessful: {
      type: Boolean,
      default: false,
    },
    // referenceCurrency: {
    //   type: String,
    //   enum: ["usd"],
    //   required: true,
    // },

    fromItem: {
      type: String,
      trim: true,
      required: true,
    },
    fromAmount: {
      type: Number,
      required: true,
      validate: [isPositive, "fromAmount must be strictly positive"],
    },
    // fromPricePerItem: {
    //   type: Number,
    //   required: true,
    //   validate: [isPositive, "fromPricePerItem must be strictly positive"],
    // },
    toItem: {
      type: String,
      trim: true,
      required: true,
    },
    toAmount: {
      type: Number,
      required: true,
      validate: [isPositive, "toAmount must be strictly positive"],
    },
    // toPricePerItem: {
    //   type: Number,
    //   required: true,
    //   validate: [isPositive, "toPricePerItem must be strictly positive"],
    // },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
