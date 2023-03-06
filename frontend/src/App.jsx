import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ImageSlider from './components/imageSlider'
import CreatePost from './components/createPost'
import PostCard from './components/PostCard'
import PostPage from './pages/PostPage'

function App() {

  return (
    <div className="App h-[100vh] w-[100vw] m-auto">
      <PostPage/>
    </div>
  )
}

export default App
