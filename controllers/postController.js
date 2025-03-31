import {
  createPostService,
  deletePostService,
  getAllPostService,
  getPostByIdService,
  updatePostService,
} from "../services/postServices.js";

export const createPostController = async (req, res) => {
  try {
    // Appel vers le service pour créer le post en BDD
    const savedPost = await createPostService(req.body);
    console.log("createController", savedPost);
    console.log(Object.keys(savedPost).includes("errors"));

    // Si le tableau est rempli, on renvoie les erreurs
    if (Object.keys(savedPost).includes("errors")) {
      return res.status(400).json({ message: "Post fail :", errors: savedPost.errors });
    }
    // Retourner le post avec la réponse crée
    res.status(201).json({ message: "Post success :", data: savedPost.newPost });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du nvx post", error });
  }
};

export const getPostController = async (req, res) => {
  try {
    // Appel vers le repository pour récuperer tous les post en BDD
    const getPost = await getAllPostService();
    console.log("Posts à récupérer :", getPost);

    if (Object.keys(getPost).includes("errors")) {
      return res.status(400).json({ message: "Récupération failed", errors: getPost.errors });
    }
    // retourner les posts avec la réponse crée
    res.status(200).json({ message: "Post récupérer avec succès", data: getPost.allPost });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des posts :", error });
  }
};

export const getPostByIdController = async (req, res) => {
  try {
    // Appel vers le repository pour recupérer le post avec l'id que l'on veut
    const getPostId = await getPostByIdService(req.params.id);
    console.log("Post à récuperer : ", getPostId);
    console.log(Object.keys(getPostId).includes("errors"));

    // Si le tableau est remplie, on renvoie le tableau avec les erreurs

    if (Object.keys(getPostId).includes("errors")) {
      res.status(400).json({ message: "failed", errors: getPostId.errors });
    }
    // Retourner les posts avec la réponse crée
    res.status(200).json({ message: "postId récupérer avec succès : ", succes: getPostId });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du postId :", error });
  }
};

export const updatePostController = async (req, res) => {
  try {
    // Appel vers le repository pour récupérer le post que l'ont veut modifier

    const updatedPost = await updatePostService(req.params.id, req.body);
    console.log("Post mis à jour : ", updatedPost);

    // Retourner le post mis à jour avec la réponse crée
    res.status(200).json({ message: "Post mis à jour avec succès", updatedPost });
  } catch (error) {
    console.error("Error message: ", error);
    res.status(500).json({ message: "Erreur lors de la modification du post", error });
  }
};

export const deletePostController = async (req, res) => {
  try {
    // Appel vers le repository pour récupérer le post que l'ont veut supprimer

    const deletePostData = await deletePostService(req.params.id);
    console.log("Id à supprimer : ", req.params.id);
    console.log(deletePostData);

    // Retourner le post supprimé avec la réponse crée
    res.status(200).json({ message: "Post supprimé avec succès : ", deletePostData });
  } catch (error) {
    console.error("Erreur message : ", error);
    res.status(500).json({ message: "Erreur lors de la suppression du post : ", error });
  }
};
