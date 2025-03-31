import {
  createMediaRepository,
  deleteMediaRepository,
  getAllMediaRepository,
  getMediaByPost,
  getMediaByPostIdRepository,
  updateMediaRepository,
} from "../repository/mediaRepository.js";

export const createMediaService = async (mediaData) => {
  try {
    const errors = [];
    // Code
    //
    //
    if (errors.length > 0) {
      return { errors };
    }
    // Si il n'y a pas d'erreur on crée le média
    const newMedia = await createMediaRepository(mediaData);
    return { newMedia };
  } catch (error) {
    throw new Error(`Erreur etc..: ${error.message}`);
  }
};
export const getMediaByPostIdService = async (mediaId) => {
  try {
    const errors = [];

    // Vérifie si l'ID est valide
    if (!mediaId) {
      errors.push("L'ID du média est requis.");
    }

    if (errors.length > 0) {
      return { errors };
    }

    // Si les données sont valides, on récupère le média
    const getMedia = await getMediaByPostIdRepository(mediaId);
    return { getMedia };
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du média : ${error.message}`);
  }
};
export const getAllMediaService = async () => {
  try {
    // Aucune validation spécifique ici, juste récupérer tous les médias
    const allMedia = await getAllMediaRepository();
    return { allMedia };
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des médias : ${error.message}`);
  }
};
export const updateMediaService = async (mediaId, updateData) => {
  try {
    const errors = [];
    // Code
    //
    //
    if (errors.length > 0) {
      return { errors };
    }
    // Si il n'y a pas d'erreur on crée le média
    const updateMedia = await updateMediaRepository(mediaId, updateData);
    return { updateMedia };
  } catch (error) {
    throw new Error(`Erreur etc..: ${error.message}`);
  }
};
export const deleteMediaService = async (mediaId) => {
  try {
    const errors = [];
    // Code
    //
    //
    if (errors.length > 0) {
      return { errors };
    }
    // Si il n'y a pas d'erreur on crée le média
    const deleteMedia = await deleteMediaRepository(mediaId);
    return { deleteMedia };
  } catch (error) {
    throw new Error(`Erreur etc.. :${error.message}`);
  }
};

export const getMediaByPostServices = async (postId) => {
  try {
    const errors = [];
    const mediaByPost = await getMediaByPost(postId);
    if (!mediaByPost.lenght || mediaByPost.lenth === 0) {
      errors.push("Aucun média trouvé pour ce post");
    }
    if (errors.length > 0) {
      return { errors };
    }
    return mediaByPost;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des médias du post : ${error.message}`);
  }
};
