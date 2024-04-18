import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (err) {
      console.log("Appwrite create post error", err);
    }
  }
  async updatePost(
    id,
    { title, slug, content, featuredImage, status, userId }
  ) {
    try {
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (err) {
      console.log("Appwrite update post error", err);
    }
  }
  async deletePost(id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
      return true;
    } catch (err) {
      console.log("Appwrite delete post Error", err);
    }
    return false;
  }
  async getPost(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
    } catch (err) {
      console.log("Appwrite get post error", err);
    }
    return false;
  }
  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (err) {
      console.log("Appwrite get all posts error", err);
    }
    return false;
  }

  async uploadFile(file) {
    try {
     return  await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (err) {
      console.log("Appwrite upload file error", err);
    }
    return null;
  }
  async deleteFile(id) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, id);
      return true;
    } catch (err) {
      console.log("Appwrite delete file error", err);
    }
    return false;
  }

 getFilePreview(id) {
    try {
     return  this.bucket.getFilePreview(conf.appwriteBucketId, id)
     
      
    } catch (err) {
      console.log("Appwrite get file preview error", err);
    }
    return false;
  }

  async downloadFile(id){
    try {
       return await this.bucket.getFileDownload(conf.appwriteBucketId, id);
      } catch (err) {
        console.log("Appwrite get file preview error", err);
      }
      return null;
  }
}

const service = new Service();
export default service;
