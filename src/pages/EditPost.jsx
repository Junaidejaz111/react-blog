import React, {useState, useEffect} from 'react'
import { Container, PostForm } from "../components"
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
function EditPost() {
  const [post, setPost] = useState(null)
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if(id){
      appwriteService.getPost(id).then((post)=>{
        if(post){
          setPost(post)
        }
      })
    }
    else{
      navigate("/")
    }
  }, [id, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null

}

export default EditPost