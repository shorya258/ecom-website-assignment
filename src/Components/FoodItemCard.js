import React from 'react'

function FoodItemCard(props) {
  return (
    <div className='w-[200px]' >
        <img src={props.menuItem.imageId} alt='food item' className='w-[50px]' />
        <div>
            Name: {props.menuItem.name}
        </div>
        <div>
            is veg: {props.menuItem.is_veg}
        </div>
    </div>
  )
}

export default FoodItemCard