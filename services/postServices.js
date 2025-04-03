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
    console.log("post créer : ", newPost);

    const mediaCreated = [];

    // Itérer sur chaque média pour l'associer au post
    for (let i = 0; i < mediaData.length; i++) {
      mediaData[i].post_media = newPost._id; // Lier l'ID du post au média
      const newMedia = await createMediaRepository(mediaData[i]); // Créer le média
      console.log("Média créé :", newMedia);
      mediaCreated.push(newMedia);
    }

    return { newPost, newMedia: mediaCreated };
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

export const updatePostService = async (postId, updateData, mediaUpdated) => {
  try {
    // Validation de la description
    const errors = [];
    if (updateData.description && updateData.description.length > 100) {
      errors.push("La description ne doit pas dépasser 100 caractères");
    }
    // if (!["Unboxing", "Review", "Comparatif", "Rareté", "Customisation"].includes(updateData.categorie)) {
    //   errors.push(
    //     "La catégorie est obligatoire et doit être l'une des propositions ci dessous :Unboxing , Review, Comparatif, Rareté, Customisation ",
    //   );
    // }

    if (errors.length > 0) {
      return { errors };
    }
    let updatedMedia = [];
    const updatePost = await updatePostRepository(postId, updateData);
    console.log("Post mis à jour :", updateData);

    // Mettre à jour chaque média associé au post
    for (let i = 0; i < mediaUpdated.length; i++) {
      mediaUpdated[i].post_media = postId; // Lier l'ID du post au média
      const media = await updateMediaRepository(postId, mediaUpdated[i]); // Mettre à jour le média
      console.log("Média mis à jour :", media);
      updatedMedia.push(media);
    }
    // Si il n'y a pas d'erreur, on met à jour le post et les médias
    return { updatePost, updateMedia: updatedMedia };
  } catch (error) {
    throw new Error(`Erreur lors de la modification du post ou des médias : ${error.message}`);
  }
};

export const deletePostService = async (postId) => {
  try {
    const errors = [];
    if (!postId) {
      errors.push("ID non fourni pour la suppression du post");
    }
    if (errors.length > 0) {
      return { errors };
    }

    // Suppression du post
    const deletePost = await deletePostRepository(postId);
    console.log("Post supprimé : ", deletePost);

    // Si un mediaId est fourni, on supprime le média

    const deleteMedia = await deleteMediaRepository(postId);

    return { deletePost, deleteMedia };
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du post : ${error.message}`);
  }
};
