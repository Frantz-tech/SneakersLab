import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MediaType",
      required: true,
    },
    url: {
      type: String,
      required: true,
      maxlength: 200,
    },
    media_name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    post_media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true },
);

const Media = mongoose.model("Media", mediaSchema);

export default Media;
