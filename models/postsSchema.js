import mongoose from "mongoose";

const SchemaPost = new mongoose.Schema(
  {
    public: {
      type: Boolean,
      required: true,
    },
    categorie: {
      type: String,
      required: true,
      enum: ["Unboxing", "Review", "Comparatif", "Rareté", "Customisation"],
    },
    description: {
      type: String,
      required: false,
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Users",
    //   required: true,
    // },
    archives: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }, // Ajoute automatiquement createdAt et updatedAt
);

const Post = new mongoose.model("Post", SchemaPost);

export default Post;
