import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  realUsage: {
    type: String,
    required: true,
  },
  synonyms: {
    type: [String], 
    required: true,
  },
  antonyms: {
    type: [String], 
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Word", wordSchema);

