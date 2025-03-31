import Media from "../models/mediaSchema.js";

export const createMediaRepository = async (mediaData) => {
  try {
    const newMedia = await Media(mediaData); // Création d'une nouvelle instance de média
    const savedMedia = await newMedia.save(); // Sauvegarde le post dans la bdd

    return savedMedia;
  } catch (error) {
    throw new Error("Erreur lors de la création du média pour le post", error);
  }
};

export const getMediaByPostIdRepository = async (mediaId) => {
  try {
    if (!mediaId) {
      throw new Error("Id du média non fourni");
    }
    // On récupère les média par id avec find by id
    const getMediaByPostId = await Media.findById(mediaId);
    console.log(" ID de média : ", mediaId);
    if (!getMediaByPostId) {
      throw new Error(`Media avec l'id ${mediaId} non trouvé `);
    }
    console.log("GetMediaByPostidRepository :", getMediaByPostId);

    return getMediaByPostId;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération du média : " ${error.message}`);
  }
};

export const getAllMediaRepository = async () => {
  try {
    // On récupere tous les médias avec .find
    const getMedia = await Media.find();
    return getMedia;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération de tous les médias : ${error.message}`);
  }
};

export const updateMediaRepository = async (mediaId, updateData) => {
  try {
    if (!mediaId) {
      throw new Error("Id du média non fourni pour l'update");
    }
    const media = await Media.findById(mediaId);
    console.log("Media à modifier :", media);

    const updatedMedia = await Media.findByIdAndUpdate(
      mediaId, // id du média à modifier
      updateData, // Nouvelles données du média ( url )
      { new: true, runValidators: true }, // Option pour retourner les données mises à jour
    );
    if (!updatedMedia) {
      throw new Error(`Le média avec l'id ${mediaId}, n'as pas été trouvé pour la modification`);
    }
    console.log("updateMediaRepository :", updatedMedia);

    return updatedMedia;
  } catch (error) {
    throw new Error(`Erreur lors de la modification du média : " ${error.message}`);
  }
};

export const deleteMediaRepository = async (mediaId) => {
  try {
    if (!mediaId) {
      throw new Error("Id non fourni pour la suppression");
    }
    // On récupere le média que l'ont veut supprimer
    const deletedMedia = await Media.findByIdAndDelete(mediaId);
    console.log(deletedMedia);

    if (!deletedMedia) {
      throw new Error(`Le média avec l'id ${mediaId} non trouvé pour la supp`);
    }
    console.log("deleteMediaRepository : ", deletedMedia);

    return deletedMedia;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du média : ", ${error.message}`);
  }
};

export const getMediaByPost = async (postId) => {
  const mediaByPost = await Media.find({ post_media: postId });
  return mediaByPost;
};
