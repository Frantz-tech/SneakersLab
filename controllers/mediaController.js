import Media from "../models/mediaSchema.js";
import {
  createMediaService,
  deleteMediaService,
  getAllMediaService,
  getMediaByPostIdService,
  updateMediaService,
} from "../services/mediaService.js";

export const createMediaController = async (req, res) => {
  try {
    // Appel vers le service pour créer le média en bdd
    const savedMedia = await createMediaService(req.body);
    console.log("createMediaController : ", savedMedia);
    console.log(Object.keys(savedMedia).includes("errors"));
    if (Object.keys(savedMedia).includes("errors")) {
      return res.status(400).json({ message: "Media fail :", errors: savedMedia.errors });
    }
    res.status(201).json({ message: "Media succes ", data: savedMedia.newMedia });
  } catch (error) {
    res.status(500).json({ message: "Erreurs lors de la création du nvx media :", error });
  }
};

export const getAllMediaController = async (req, res) => {
  // Appel vers le servce pour récuperer tout les médias
  try {
    const getMedia = await getAllMediaService();
    console.log("Liste de tout les média :", getMedia);
    if (Object.keys(getMedia).includes("errors")) {
      return res.status(400).json({ message: "Recup failed ", error: getMedia.errors });
    }
    res.status(200).json({ message: "Recup Success", data: getMedia.allMedia });
  } catch (error) {
    res.status(500).json({ message: "Erreurs lors de la création du nvx media :", error });
  }
};

export const getMediaByIdController = async (req, res) => {
  // Appel vers le service pour recuperer un média sépcifique
  try {
    const getMediaById = await getMediaByPostIdService(req.params.id);
    console.log("Media sélectionné : ", getMediaById);
    if (Object.keys(getMediaById).includes("errors")) {
      return res.status(400).json({ message: "Recup d'un seul média failed ", error: getMediaById.errors });
    }
    res.status(200).json({ message: "Recup Success", data: getMediaById.getMedia });
  } catch (error) {
    res.status(500).json({ message: "Erreurs lors de la récupération du media :", error });
  }
};

export const updateMediaController = async (req, res) => {
  // Appel vers le service pour modifier un média spécifique
  try {
    const updateMedia = await updateMediaService(req.params.id, req.body);
    console.log("Media modifié : ", updateMedia);
    if (Object.keys(updateMedia).includes("errors")) {
      return res.status(400).json({ message: "Modif du média failed ", error: updateMedia.errors });
    }
    res.status(200).json({ message: "Update Success", data: updateMedia.updateMedia });
  } catch (error) {
    res.status(500).json({ message: "Erreurs lors de la modification du media :", error });
  }
};

export const deleteMediaController = async (req, res) => {
  // Appel vers le service pour supprimer un média spécifique
  try {
    const deletedMedia = await deleteMediaService(req.params.id);
    console.log("Media supprimé :", deletedMedia);
    if (Object.keys(deletedMedia).includes("errors")) {
      return res.status(400).json({ message: "Delete du média failed ", error: deletedMedia.errors });
    }
    res.status(200).json({ message: "Delete Success", data: deletedMedia.deleteMedia });
  } catch (error) {
    res.status(500).json({ message: "Erreurs lors de la suppression du media :", error });
  }
};

export const getMediaByPostController = async (req, res) => {
  // Appel vers le service pour récuperer les médias d'un post
  try {
    const { id } = req.params;
    const mediaByPost = await Media.find({ post_media: id });

    if (!mediaByPost.length) {
      return res.status(404).json({ message: "Aucun média trouvé pour ce post." });
    }

    res.status(200).json({ message: "Media par post succes :", data: mediaByPost });
  } catch (error) {
    console.error("Erreur lors de la récupération des médias :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
