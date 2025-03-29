import Post from "../models/mongoSchema.js";

export const createPost = async (postData) => {
  try {
    const newPost = new Post(postData); // Création d'une nouvelle instance de post
    const savedPost = await newPost.save(); // Sauvegarde le post dans la bdd
    return savedPost;
  } catch (error) {
    throw new Error("Erreur lors de la création du post : ", error);
  }
};

export const getPostById = async (postId) => {
  try {
    // On récupere les post par id avec findById
    const getPostById = await Post.findById(postId);
    console.log(postId);

    // Si l'id n'existe pas on envoie une erreur
    if (!getPostById) {
      throw new Error(`Post avec l'id ${postId} non trouvé`);
    }
    return getPostById;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du post avec l'Id ${postId}: ${error.message}`);
  }
};

export const getAllPost = async (allPostData = {}) => {
  try {
    // On récupere tout les post avec .find
    const getPost = await Post.find(allPostData);
    return getPost;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de tous les posts :", error.message);
  }
};

export const updatePost = async (postId, updateData) => {
  try {
    // On récupère le post que l'ont veut modifier
    const updatedPost = await Post.findByIdAndUpdate(
      postId, // L'id du post à modifier
      updateData, // Les nouvelles données du post
      { new: true, runValidators: true }, // Option pour retourner les données mises à jour
    );

    if (!updatedPost) {
      throw new Error(`Le post avec l'id ${postId}, n'as pas été trouvé pour la modification`);
    }
    return updatedPost;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour du post : ${error.message}`);
  }
};

export const deletePost = async (postId) => {
  try {
    // On récupere le post que l'on veut delete
    const deletedPost = await Post.findByIdAndDelete(postId);
    console.log(postId);

    if (!deletedPost) {
      throw new Error(`Le post avec l'id ${postId} non trouvé pour la suppression `);
    }
    return deletedPost;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du post :, ${error.message}`);
  }
};

// utilser find ou findById ou save ou findByIdAndDelete
