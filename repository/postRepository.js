import Media from "../models/mediaSchema.js";
import Post from "../models/postsSchema.js";

export const createPostRepository = async (postData) => {
  try {
    const newPost = new Post(postData); // Création d'une nouvelle instance de post
    const savedPost = await newPost.save(); // Sauvegarde le post dans la bdd
    return savedPost;
  } catch (error) {
    throw new Error("Erreur lors de la création du post : ", error);
  }
};

export const getPostByIdRepository = async (postId) => {
  try {
    // On récupere les post par id avec findById
    const getPostById = await Post.findById(postId);

    // Si l'id n'existe pas on envoie une erreur
    if (!getPostById) {
      throw new Error(`Post avec l'id ${postId} non trouvé`);
    }
    return { getPostById };
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du post avec l'Id ${postId}: ${error.message}`);
  }
};

export const getAllPostRepository = async () => {
  try {
    // On récupere tout les post avec .find
    const getAllPost = await Post.find();

    const getAllMedia = await Media.find();

    return { getAllPost, getAllMedia };
  } catch (error) {
    throw new Error("Erreur lors de la récupération de tous les posts :", error.message);
  }
};

export const updatePostRepository = async (postId, updateData) => {
  try {
    // On récupère le post que l'ont veut modifier
    const post = await Post.findById(postId);
    console.log("Post à modifier :", post);
    console.log("Id du post à modifier : ", postId);

    const updatedPost = await Post.findByIdAndUpdate(
      postId, // L'id du post à modifier
      { $set: updateData }, // Les nouvelles données du post
      { new: true, runValidators: true }, // Option pour retourner les données mises à jour
    );

    if (!updatedPost) {
      throw new Error(`Le post avec l'id ${postId}, n'as pas été trouvé pour la modification`);
    }
    return { updatedPost };
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour du post : ${error.message}`);
  }
};

export const deletePostRepository = async (postId) => {
  try {
    // On récupere le post que l'on veut delete
    const deletedPost = await Post.findByIdAndDelete(postId);
    console.log("Id du post à supprimer", postId);

    if (!deletedPost) {
      throw new Error(`Le post avec l'id ${postId} non trouvé pour la suppression `);
    }
    return { deletedPost };
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du post :, ${error.message}`);
  }
};

// utiliser find ou findById ou save ou findByIdAndDelete
