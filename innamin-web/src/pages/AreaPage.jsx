import { useState } from "react";
import { Link, useParams } from "react-router";
import { useApi } from "../useApi";
import { money } from "../format";
import CuisineArt from "../CuisineArt";

export default function AreaPage() {
  const { areaId } = useParams();
  const { data, loading, error } = useApi(`/areas/${areaId}/restaurants`);
  const [cuisine, setCuisine] = useState("All");

  if (loading) return <p>Loading restaurants...</p>;
  if (error === "not-found") {
    return (
      <p>
        We couldn't find that area. <Link to="/">Choose another area</Link>
      </p>
    );
  }
  if (error) return <p>Could not load restaurants: {error}</p>;

  const cuisines = ["All", ...new Set(data.restaurants.map((r) => r.cuisine))];
  const activeCuisine = cuisines.includes(cuisine) ? cuisine : "All";
  const shown =
    activeCuisine === "All"
      ? data.restaurants
      : data.restaurants.filter((r) => r.cuisine === activeCuisine);

  return (
    <div>
      <header className="page-hero">
        <div className="page-hero-inner">
          <Link className="back-link" to="/">
            All towns
          </Link>
          <h1>Restaurants in {data.area.name}</h1>
          <p className="page-hero-lead">
            {data.restaurants.length} restaurants deliver here. Pick one to see its menu.
          </p>
        </div>
      </header>

      <section className="content">
        <div className="filters" role="group" aria-label="Filter by cuisine">
          {cuisines.map((c) => (
            <button key={c} onClick={() => setCuisine(c)} aria-pressed={c === activeCuisine}>
              {c}
            </button>
          ))}
        </div>

        <ul className="restaurant-list">
          {shown.map((r) => (
            <li key={r.id} className="restaurant">
              <CuisineArt cuisine={r.cuisine} className="restaurant-art" />
              <div className="restaurant-main">
                <h2>
                  <Link className="restaurant-link" to={`/restaurants/${r.id}`}>
                    {r.name}
                  </Link>
                </h2>
                <p className="restaurant-cuisine">{r.cuisine}</p>
                <p className="restaurant-desc">{r.description}</p>
              </div>
              <dl className="facts">
                <div>
                  <dt>Delivery</dt>
                  <dd>{r.deliveryMinutes} min</dd>
                </div>
                <div>
                  <dt>Fee</dt>
                  <dd>{money(r.deliveryFee)}</dd>
                </div>
                <div>
                  <dt>Minimum</dt>
                  <dd>{money(r.minimumOrder)}</dd>
                </div>
              </dl>
              <span className="rating">
                <span className="sr-only">Rated </span>
                {r.rating.toFixed(1)}
                <span className="sr-only"> out of 5</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}