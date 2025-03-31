import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
// import { test } from "vitest";

// Mocker la base de donnée de mongoDB
describe("Post Tests", () => {
  let mongoServer;
  let connection;
  let db;

  beforeEach(async () => {
    console.log("Setup MongoMemoryServer");
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    connection = await MongoClient.connect(uri);
    db = connection.db();
    if (!db) throw new Error("Erreur lors de la connection à la base de donnée ");
  });
  afterEach(async () => {
    await connection.close();
    await mongoServer.stop();
  });

  // Test créer un post

  it("doit ajouter un post dans la bdd", async () => {
    const posts = db.collection("posts");
    const newPost = { status: true, categorie: "Customization", description: "This is a test", archives: false };

    const result = await posts.insertOne(newPost);
    expect(result.acknowledged).toBe(true);

    const insertedPost = await posts.findOne({ _id: result.insertedId });
    expect(insertedPost).toMatchObject(newPost);
    console.log(newPost);
  });

  it("doit sélectionner tous les posts dans la bdd", async () => {
    const posts = db.collection("posts");

    // Inserer deux posts
    const newPost = [
      { status: true, categorie: "Customization", description: "This is a test", archives: false },
      { status: false, categorie: "Hide n Seek", description: "Test nbr 2", archives: true },
    ];
    console.log("Post à mettre dans le (select tout les posts dans la bdd) ", newPost[0]);
    const allThePosts = await posts.insertMany(newPost);
    expect(allThePosts.acknowledged).toBe(true);
    console.log(allThePosts);

    // Récuperer tous les posts
    const allPosts = await posts.find().toArray();
    console.log("Résultats de tous les posts : ", allPosts);

    // Vérifier que le post est bien dans la liste
    expect(allPosts).toEqual(expect.arrayContaining([expect.objectContaining(newPost[0])]));
  });

  it("doit selection un seul post dans la bdd", async () => {
    const posts = db.collection("posts");

    // Inserer deux posts
    const newPost = [
      { status: true, categorie: "Customization", description: "This is a test", archives: false },
      { status: false, categorie: "Hide n Seek", description: "Test nbr 2", archives: true },
    ];
    console.log("Post à mettre dans le (select tout les posts dans la bdd) ", newPost[0]);
    const allThePosts = await posts.insertMany(newPost);
    expect(allThePosts.acknowledged).toBe(true);
    console.log(allThePosts);

    // Récuperer tous les posts
    const allPosts = await posts.find().toArray();
    console.log("Résultats de tous les posts : ", allPosts);

    // Vérifier que le post est bien dans la liste
    expect(allPosts).toEqual(expect.arrayContaining([expect.objectContaining(newPost[0])]));
  });
});
