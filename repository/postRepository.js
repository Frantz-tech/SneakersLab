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

export const getPostDataById = async (postId) => {
  try {
    // On récupere les post par id avec findById
    console.log(postId);
    const getPostById = await Post.findById(postId);

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

// export const deletePost = async (deletePost) => {
//   try {
//     // On récupere le post que l'on veut delete
//     const deletedPost = await Post.findById(deletePost);
//     return deletedPost;
//   } catch (error) {
//     throw new Error("Erreur lors de la suppression du post :", error);
//   }
// };
