import { restaurants } from './mock.js'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Restaurant List</h1>
      {restaurants.map(restaurant => (
        <div className="restaurant" key={restaurant.id}>
          <h2>{restaurant.name}</h2>
          
          <h3>Меню</h3>
          <ul>
            {restaurant.menu.map(dish => (
              <li key={dish.id}>{dish.name}</li>
            ))}
          </ul>
          
          <h3>Отзывы</h3>
          <ul>
            {restaurant.reviews.map(review => (
              <li key={review.id}>{review.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default App
