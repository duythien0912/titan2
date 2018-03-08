import mongoose from "mongoose";

const schema = new mongoose.Schema({
  seriesTitle: { type: String, required: true },
  seriesSynonyms: { type: String, required: true },
  seriesEpisodes: { type: String, required: true },
  seriesStatus: { type: String, required: true },
  seriesImage: { type: String, required: true },
  useId: { type: mongoose.Schema.Types.ObjectId, required: true }
});
export default mongoose.model("items", schema);
