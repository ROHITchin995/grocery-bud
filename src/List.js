import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';


export const List = ({ items, removeItem, editItem }) => {

  return (
    <div>
      {items.map((items) => {
        const { id, title } = items;
        return (
          <article key={id}>
            <p>{title}</p>
            <div>
              <button onClick={()=> editItem(id)}>
                <FaEdit />
              </button>
              <button onClick={()=> removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
