import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';


export const List = ({ items, removeItem, editItem }) => {

  return (
    <div>
      {items.map((items) => {
        const { id, title } = items;
        return (
          <article className='grocery_item' key={id}>
            <p className='title'>{title}</p>
            <div>
              <button className='edit_button' onClick={()=> editItem(id)}>
                <FaEdit />
              </button>
              <button className='delete_button' onClick={()=> removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
