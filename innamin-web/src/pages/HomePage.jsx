import { Link } from "react-router";
import { useApi } from "../useApi";
import CuisineArt from "../CuisineArt";
import Scooter from "../Scooter";

// Roughly south-west to north-east, so the towns sit on the line in map order.
const MAP_ORDER = ["Takoma Park", "Hyattsville", "Riverdale Park", "College Park", "Greenbelt"];

function mapPosition(name) {
  const index = MAP_ORDER.indexOf(name);
  return index === -1 ? MAP_ORDER.length : index;
}

export default function HomePage() {
  const { data: areas, loading, error } = useApi("/areas");
  const stops = areas ? [...areas].sort((a, b) => mapPosition(a.name) - mapPosition(b.name)) : [];

  return (
    <div>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-top">
            <h1>Order from restaurants in your town.</h1>
            <div className="hero-side">
              <p className="hero-lead">Choose where you are to see who delivers there.</p>
              <div className="hero-stickers" aria-hidden="true">
                <CuisineArt cuisine="pizza" />
                <CuisineArt cuisine="mexican" />
                <CuisineArt cuisine="indian" />
                <CuisineArt cuisine="burger" />
              </div>
            </div>
          </div>

          <h2 id="route-heading" className="route-heading">
            Where are you?
          </h2>
          {loading && <p>Loading towns...</p>}
          {error && <p role="alert">Could not load towns: {error}</p>}
          {areas && (
            <div className="route-wrap" style={{ "--stops": stops.length }}>
              <Scooter className="route-scooter" />
              <ol className="route" aria-labelledby="route-heading">
                {stops.map((area, index) => (
                  <li key={area.id} style={{ "--i": index }}>
                    <Link className="station" to={`/areas/${area.id}`}>
                      <span className="station-dot" aria-hidden="true" />
                      <span className="station-name">{area.name}</span>
                      <span className="station-count">
                        {area.restaurantCount} {area.restaurantCount === 1 ? "restaurant" : "restaurants"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      <section className="how">
        <h2>How ordering works</h2>
        <ol>
          <li>
            <h3>Choose your town</h3>
            <p>Pick the area you want your food delivered to.</p>
          </li>
          <li>
            <h3>Pick a restaurant</h3>
            <p>Browse the menu and add dishes to your cart.</p>
          </li>
          <li>
            <h3>Place the order</h3>
            <p>Enter your delivery details, then follow your order until it arrives.</p>
          </li>
        </ol>
      </section>
    </div>
  );
}