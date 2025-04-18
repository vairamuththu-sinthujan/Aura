import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { addComment, allPost, createPost, deletePost, editPost, getPost, getSavedPost, LikeAndUnLike, SaveAndUnsave } from '../controllers/postController.js'


const postRouter = express.Router()

postRouter.post("/create", userAuth, createPost)
postRouter.delete("/delete", userAuth, deletePost)
postRouter.get("/all", userAuth, allPost)
postRouter.put("/like_and_unlike/:postId", userAuth, LikeAndUnLike)
postRouter.put("/save_and_unsave/:postId", userAuth, SaveAndUnsave)
postRouter.put("/edit/:postId", userAuth, editPost)
postRouter.post("/comment/:postId", userAuth, addComment)
postRouter.get("/saved/:user", userAuth, getSavedPost)
postRouter.get("/:user", userAuth, getPost)



export default postRouter