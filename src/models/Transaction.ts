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
    fromItemName: {
      type: String,
      trim: true,
      required: true,
    },
    fromItemSymbol: {
      type: String,
      trim: true,
      required: true,
    },
    fromItemCoinMarketCapId: {
      type: String,
      trim: true,
      required: true,
    },
    fromItemCoinGeckoId: {
      type: String,
      trim: true,
      required: true,
    },
    fromItemLogo: {
      type: String,
      trim: true,
    },
    fromAmount: {
      type: Number,
      required: true,
      validate: [isPositive, "fromAmount must be strictly positive"],
    },

    toItemName: {
      type: String,
      trim: true,
      required: true,
    },
    toItemSymbol: {
      type: String,
      trim: true,
      required: true,
    },
    toItemCoinMarketCapId: {
      type: String,
      trim: true,
      required: true,
    },
    toItemCoinGeckoId: {
      type: String,
      trim: true,
      required: true,
    },
    toItemLogo: {
      type: String,
      trim: true,
    },
    toAmount: {
      type: Number,
      required: true,
      validate: [isPositive, "toAmount must be strictly positive"],
    },

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
