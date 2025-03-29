import { createPost, deletePost, getAllPost, getPostById, updatePost } from "../repository/postRepository.js";

export const createPostController = async (req, res) => {
  try {
    // Appel vers le repository pour créer le post en BDD
    const savedPost = await createPost(req.body);

    // Retourner le post avec la réponse crée
    res.status(201).json({ message: "Post crée avec succès :", savedPost });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du post", error });
  }
};

export const getPostController = async (req, res) => {
  try {
    // Appel vers le repository pour récuperer tous les post en BDD
    const getPost = await getAllPost();
    console.log("Posts à récupérer :", getPost);

    // retourner les posts avec la réponse crée
    res.status(200).json({ message: "Post récupérer avec succès", getPost });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des posts :", error });
  }
};

export const getPostByIdController = async (req, res) => {
  try {
    // Appel vers le repository pour recupérer le post avec l'id que l'on veut
    const getPostId = await getPostById(req.params.id);
    console.log("Id à récuperer : ", getPostById);
    console.log(getPostId);

    // Retourner les posts avec la réponse crée
    res.status(200).json({ message: "postId récupérer avec succès : ", getPostId });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du postId :", error });
  }
};

export const updatePostController = async (req, res) => {
  try {
    // Appel vers le repository pour récupérer le post que l'ont veut modifier

    const updatedPost = await updatePost(req.params.id, req.body);
    console.log(" Id à modifier : ", req.params.id);
    console.log(" Post à modifier : ", req.body);
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

    const deletePostData = await deletePost(req.params.id);
    console.log("Id à supprimer : ", req.params.id);
    console.log(deletePostData);

    // Retourner le post supprimé avec la réponse crée
    res.status(200).json({ message: "Post supprimé avec succès : ", deletePostData });
  } catch (error) {
    console.error("Erreur message : ", error);
    res.status(500).json({ message: "Erreur lors de la suppression du post : ", error });
  }
};
