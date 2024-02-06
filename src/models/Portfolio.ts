import mongoose from "mongoose";

const isPositive = (value: number) => {
  return value > 0;
};

const CoinSchema = new mongoose.Schema(
  {
    coinId: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      validate: [isPositive, "amount must be strictly positive"],
    },
  },
  { versionKey: false }
);

const HistoryPointSchema = new mongoose.Schema(
  {
    totalInvested: {
      type: Number,
      required: true,
      min: 0,
    },
    totalWithdrawn: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPortfolioPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

const PortfolioSchema = new mongoose.Schema(
  {
    coins: {
      type: [CoinSchema],
      default: [],
    },
    totalInvested: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalWithdrawn: {
      type: Number,
      default: 0,
      min: 0,
    },
    historyData: {
      type: [HistoryPointSchema],
      default: [
        { totalInvested: 0, totalWithdrawn: 0, totalPortfolioPrice: 0 },
      ],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Portfolio =
  mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
