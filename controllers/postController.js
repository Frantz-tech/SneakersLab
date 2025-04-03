import {
  createPostService,
  deletePostService,
  getAllPostService,
  getPostByIdService,
  updatePostService,
} from "../services/postServices.js";

export const createPostController = async (req, res) => {
  try {
    const { postData, mediaData } = req.body;
    // Appel vers le service pour créer le post en BDD
    const savedPost = await createPostService(postData, mediaData);
    console.log("createController", savedPost);

    // Si le tableau est rempli, on renvoie les erreurs
    if (savedPost.errors) {
      return res.status(400).json({ message: "Post fail :", errors: savedPost.errors });
    }
    // Retourner le post avec la réponse crée
    res.status(201).json({ message: "Post success :", post: savedPost.newPost, media: savedPost.newMedia });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du nvx post", error });
  }
};

export const getPostController = async (req, res) => {
  try {
    // Appel vers le repository pour récuperer tous les post en BDD

    const getPost = await getAllPostService();
    console.log("Posts à récupérer :", getPost.getAllMedia, getPost.getAllPost);

    if (Object.keys(getPost).includes("errors")) {
      return res.status(400).json({ message: "Récupération failed", errors: getPost.errors });
    }
    // retourner les posts avec la réponse crée
    res.status(200).json({ message: "Post récupérer avec succès", Postdata: getPost.getAllPost });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des posts :", error });
  }
};

export const getPostByIdController = async (req, res) => {
  try {
    // Appel vers le repository pour recupérer le post avec l'id que l'on veut
    const { id, mediaId } = req.params;
    const getPostId = await getPostByIdService(id, mediaId);

    console.log(Object.keys(getPostId).includes("errors"));

    // Si le tableau est remplie, on renvoie le tableau avec les erreurs

    if (Object.keys(getPostId).includes("errors")) {
      res.status(400).json({ message: "failed", errors: getPostId.errors });
    }
    // Retourner les posts avec la réponse crée
    res.status(200).json({
      message: "postId récupérer avec succès : ",
      post: getPostId.getPost,
      media: getPostId.getMediaByPostId,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du postId :", error });
  }
};

export const updatePostController = async (req, res) => {
  try {
    // Appel vers le repository pour récupérer le post que l'ont veut modifier
    const { id } = req.params;
    const { postData, mediaData } = req.body;
    console.log("Contenu de la requete sur postman :", req.body);

    console.log("Ici postdata ( données du post pour la modification ) : ", postData);
    console.log("Ici mediadata ( données du média pour la modification ) : ", mediaData);

    const updatedPost = await updatePostService(id, postData, mediaData);

    console.log("Post et médias mis à jour : ", updatedPost);
    if (updatedPost.errors) {
      return res.status(400).json({ message: "Post update fail : ", error: updatedPost.errors });
    }

    // Retourner le post mis à jour avec la réponse crée
    res.status(200).json({
      message: "Post mis à jour avec succès",
      updatedPost: updatedPost.updatePost,
      updateMedia: updatedPost.updateMedia,
    });
  } catch (error) {
    console.error("Error message: ", error);
    res.status(500).json({ message: "Erreur lors de la modification du post", error });
  }
};

export const deletePostController = async (req, res) => {
  try {
    // Appel vers le repository pour récupérer le post que l'ont veut supprimer
    const { id, mediaId } = req.params;

    const deletePostData = await deletePostService(id, mediaId);
    console.log("Id à supprimer : ", req.params.id);
    console.log("deletePostController", deletePostData);

    // Retourner le post supprimé avec la réponse crée
    res.status(200).json({
      message: "Post supprimé avec succès : ",
      dataSupprimé: deletePostData.deletePost,
      mediaSupprimé: deletePostData.deleteMedia,
    });
  } catch (error) {
    console.error("Erreur message : ", error);
    res.status(500).json({ message: "Erreur lors de la suppression du post : ", error });
  }
};
