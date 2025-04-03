import Media from "../models/mediaSchema.js";

export const createMediaRepository = async (mediaData) => {
  try {
    console.log("Données du média reçues : ", mediaData); // Log des données avant la création
    const newMedia = new Media(mediaData);
    const savedMedia = await newMedia.save();
    console.log("Média sauvegardé : ", savedMedia); // Log après la sauvegarde
    return { savedMedia };
  } catch (error) {
    console.error("Erreur dans createMediaRepository : ", error.message); // Log de l'erreur
    throw new Error("Erreur lors de la création du média", error);
  }
};

export const getMediaByPostIdRepository = async (postId) => {
  try {
    if (!postId) {
      throw new Error("Id du média non fourni");
    }
    // On récupère les média par id avec find by id
    const getMediaByPostId = await Media.find({ post_media: postId });

    if (!getMediaByPostId) {
      throw new Error(`Media avec l'id ${postId} non trouvé `);
    }

    return { getMediaByPostId };
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du média avec l'id${postId}: " ${error.message}`);
  }
};

export const getAllMediaRepository = async (mediaData) => {
  try {
    // On récupere tous les médias avec .find
    const getMedia = await Media.find({ post_media: mediaData });
    return { getMedia };
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de tous les médias : ${error.message}`);
  }
};

export const updateMediaRepository = async (postId, mediaUpdated) => {
  try {
    if (!postId) {
      throw new Error("Id du média non fourni pour l'update");
    }
    const { media_name, url } = mediaUpdated;
    console.log("updateMediaRepository, mediaUpdated", mediaUpdated);
    console.log("upadateMediaReposry, id media", mediaUpdated._id);

    const updatedMedia = await Media.findByIdAndUpdate(
      mediaUpdated._id, // ID du document à modifier
      { $set: { media_name, url } }, // Mise à jour
      { new: true, runValidators: true }, // Options
    );

    return { updatedMedia };
  } catch (error) {
    throw new Error(`Erreur lors de la modification du média : ${error.message}`);
  }
};

export const deleteMediaRepository = async (postId) => {
  try {
    console.log("Id du post pour supprimer les médias : ", postId);

    if (!postId) {
      throw new Error("Id du post non fourni pour la suppression des médias");
    }

    // Récupérer tous les médias associés au postId
    const mediasToDelete = await Media.find({ post_media: postId });

    if (mediasToDelete.length === 0) {
      throw new Error(`Aucun média trouvé pour le post avec l'id ${postId}`);
    }

    // Supprimer tous les médias associés au postId
    const deletedMedias = await Media.deleteMany({ post_media: postId });

    console.log("Médias supprimés : ", deletedMedias);

    return { deletedMedias };
  } catch (error) {
    throw new Error(`Erreur lors de la suppression des médias pour le post ${postId}: ${error.message}`);
  }
};
