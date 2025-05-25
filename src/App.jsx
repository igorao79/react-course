import { restaurants } from './mock';
import Restaurant from './components/Restaurant';

function App() {
  return (
    <div className="app">
      <h1>Restaurant Review App</h1>
      
      {/* Restaurant with full data */}
      <Restaurant restaurant={restaurants[0]} />
      
      {/* Example of conditional rendering with missing data */}
      <Restaurant restaurant={null} />
      
      {/* Example of restaurant without menu */}
      <Restaurant restaurant={{
        id: "no-menu",
        name: "Restaurant Without Menu",
        reviews: []
      }} />
    </div>
  );
}

export default App;
