import {
  createPostRepository,
  deletePostRepository,
  getAllPostRepository,
  getPostByIdRepository,
  updatePostRepository,
} from "../repository/postRepository.js";

export const createPostService = async (postData) => {
  try {
    // Validation de la description :
    const errors = [];
    if (postData.description.length > 100) {
      errors.push("La description ne doit pas dépasser les 100 caractères");
    }
    if (!["Unboxing", "Review", "Comparatif", "Rareté", "Customisation"].includes(postData.categorie)) {
      errors.push(
        "La catégorie est obligatoire et doit être l'une des propositions ci dessous :Unboxing , Review, Comparatif, Rareté, Customisation ",
      );
    }
    if (errors.length > 0) {
      return { errors };
    }
    // Si il n'y a pas d'erreur on crée le post
    const newPost = await createPostRepository(postData);
    return { newPost };
  } catch (error) {
    throw new Error(`Erreur lors de la création du nouveau post : ${error.message}`);
  }
};

export const getPostByIdService = async (postId) => {
  try {
    const errors = [];

    if (!postId) {
      errors.push("id non trouvé pour récuperer le post");
    }
    if (errors.length > 0) {
      return { errors };
    }
    const getPost = await getPostByIdRepository(postId);
    return { getPost };
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du post avec l'id ${postId}: ${error.message}`);
  }
};

export const getAllPostService = async () => {
  try {
    const errors = [];
    const allPost = await getAllPostRepository();
    if (!allPost || allPost.length === 0) {
      errors.push("Aucun post n'as été trouvé");
      console.log("aucun post trouvé");
      return { errors };
    }
    return { allPost };
  } catch (error) {
    throw new Error(`Erreurs lors de la récupération de tous les posts ${error.message}`);
  }
};

export const updatePostService = async (postId, updateData) => {
  try {
    // Validation de la description :
    const errors = [];
    if (updateData.description.length > 100) {
      errors.push("La description ne doit pas dépasser les 100 caractères");
    }
    if (!["Unboxing", "Review", "Comparatif", "Rareté", "Customisation"].includes(updateData.categorie)) {
      errors.push(
        "La catégorie est obligatoire et doit être l'une des propositions ci dessous :Unboxing , Review, Comparatif, Rareté, Customisation ",
      );
    }
    if (errors.length > 0) {
      return { errors };
    }
    // Si il n'y a pas d'erreur on crée le post
    const updatePost = await updatePostRepository(postId, updateData);
    return { updatePost };
  } catch (error) {
    throw new Error(`Erreur lors de la création du nouveau post : ${error.message}`);
  }
};

export const deletePostService = async (postId) => {
  try {
    const errors = [];
    const deletePost = await deletePostRepository(postId);
    if (!deletePost || deletePost.length === 0) {
      errors.push("Aucun post n'as été trouvé pour la suppression");
      console.log("Aucun post trouvé pour la supp");

      return { errors };
    }
    return { deletePost };
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du post ${error.message}`);
  }
};
