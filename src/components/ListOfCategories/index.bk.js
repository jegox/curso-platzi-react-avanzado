import React, { useState, useEffect } from 'react'
import { Category } from '../Category'
import { List, Item } from './styles'
//import { categories as mockCategories } from '../../../api/db.json'

export const ListOfCategories = () => {
  const [ categories, setCategories ] =  useState([])

  useEffect(() => {
    fetch('https://petgram-server.midudev.now.sh/categories')
      .then(res => res.json())
      .then(res => setCategories(res))
  }, [])
  return (
    <List>
      {
        categories.map(category => {
          {console.log(category)}
          <Item key={category.id}>
            <Category {...category} />
          </Item>
        })
      }
    </List>
  )
}