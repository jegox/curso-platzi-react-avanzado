import React, { useEffect, useRef, useState, Fragment } from 'react'
import { ImgWrapper, Img, Button, Article } from './styles'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"

const DEFAULT_IMAGE = 'https://res.cloudinary.com/midudev/image/upload/w_150/v1555671700/category_rabbits.jpg'

const useLocalStorage = (key, initialValue) => {
  const [ storedValue, setValue ] = useState(() => {
    try{
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    }catch(e){
      return initialValue
    }
  })

  const setLocalStorage = value => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      setValue(value)
    }catch(error) {
      console.log(error)
    }
  }

  return [ storedValue, setLocalStorage ]
}


export const PhotoCard = ({ id, likes = 0, src = DEFAULT_IMAGE }) => {
  const el = useRef(null)
  const [ show, setShow ] = useState(false)
  const key = `like-${id}`
  const [liked, setLiked] = useLocalStorage(key, false)

  useEffect(() => {
    Promise.resolve(
      typeof window.IntersectionObserver !== 'undefined' 
      ? window.IntersectionObserver
      : import('intersection-observer')
    ).then(() => {
      const observer = new IntersectionObserver(entries => {
        const { isIntersecting } = entries[0]
        if(isIntersecting){
          setShow(true)
          observer.disconnect()
        }
      })
      observer.observe(el.current)
    })
  }, [el])

  const Icon = liked ? MdFavorite : MdFavoriteBorder

  return (
    <Article ref={el}>
      {
        show && 
        <Fragment>
          <a href={`/datail/${id}`} >
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </a>
          <Button onClick={() => setLiked(!liked) } >
            <Icon size='32px' /> {likes} likes!
          </Button>
        </Fragment>
      }
    </Article>
  )
}