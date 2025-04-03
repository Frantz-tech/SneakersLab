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
    userId: {
      type: String, // Stock l'id de Prisma
      required: false,
    },
    archives: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }, // Ajoute automatiquement createdAt et updatedAt
);

const Post = new mongoose.model("Post", SchemaPost);

export default Post;
