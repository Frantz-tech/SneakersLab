import { createPost, getAllPost, getPostDataById } from "../repository/postRepository.js";

export const createPostController = async (req, res) => {
  try {
    // Appel vers le repository pour créer le post en BDD
    const savedPost = await createPost(req.body);

    // Retourner le post avec la réponse créer
    res.status(201).json({ message: "Post crée avec succès :", savedPost });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du post", error });
  }
};

export const getPostController = async (req, res) => {
  try {
    // Appel vers le repository pour récuperer tous les post en BDD
    const getPost = await getAllPost();

    // retourner les posts avec la réponse créer
    res.status(200).json({ message: "Post récupérer avec succès", getPost });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des posts :", error });
  }
};

export const getPostByIdController = async (req, res) => {
  try {
    // Appel vers le repository pour recupérer le post avec l'id que l'on veut
    const getPostId = await getPostDataById(req.params.id);
    console.log(getPostId);

    // Retoruner les post avec la réponse créer
    res.status(200).json({ message: "postId récupérer avec succès : ", getPostId });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du postId :", error });
  }
};
