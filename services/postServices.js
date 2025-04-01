import {
  createMediaRepository,
  deleteMediaRepository,
  getAllMediaRepository,
  getMediaByPostIdRepository,
  updateMediaRepository,
} from "../repository/mediaRepository.js";
import {
  createPostRepository,
  deletePostRepository,
  getAllPostRepository,
  getPostByIdRepository,
  updatePostRepository,
} from "../repository/postRepository.js";

export const createPostService = async (postData, mediaData) => {
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

    mediaData.post_media = newPost._id; // On lie l'id du post avec celui du média

    const newMedia = await createMediaRepository(mediaData); // On crée le média

    return { newPost, newMedia };
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
    console.log(getPost);

    const getMediaByPostId = await getMediaByPostIdRepository(postId);
    console.log(getMediaByPostId);

    return { getPost, getMediaByPostId };
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du post avec l'id ${postId}: ${error.message}`);
  }
};

export const getAllPostService = async () => {
  try {
    const errors = [];
    const getAllPost = await getAllPostRepository();
    if (!getAllPost || getAllPost.length === 0) {
      errors.push("Aucun post n'as été trouvé");
      return { errors };
    }

    const getAllMedia = await getAllMediaRepository();

    return { getAllPost, getAllMedia };
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
    // Si il n'y a pas d'erreur on met à jour le post
    const updatePost = await updatePostRepository(postId, updateData);

    // Si un id de média est donné, on met a jour le média et le post
    if (updateData.mediaId) {
      const updateMedia = await updateMediaRepository(updateData.mediaId, updateData);
      return { updateData, updateMedia };
    }

    return { updatePost };
  } catch (error) {
    throw new Error(`Erreur lors de la création du nouveau post : ${error.message}`);
  }
};

export const deletePostService = async (postId, mediaId) => {
  try {
    const errors = [];
    if (!postId) {
      errors.push("ID non fourni pour la suppression du post ");
    }
    if (errors.length > 0) {
      return { errors };
    }

    const deletePost = await deletePostRepository(postId);

    if (mediaId) {
      const deleteMedia = await deleteMediaRepository(mediaId);
      return { deletePost, deleteMedia };
    }

    return { deletePost };
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du post ${error.message}`);
  }
};
