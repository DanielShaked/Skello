import heroImg from '../assets/imgs/hero.png';

export function HomePage() {
  return (
    <section className="homepage">
      <div className="hero flex">
        <div className="hero-content flex column">
          <h1>Skello helps teams move work forward.</h1>
          <p>
            Collaborate, manage projects, and reach new productivity peaks. From high rises to the home
            office, the way your team works is unique—accomplish it all with Trello.
          </p>
          <button>Start Demo</button>
        </div>
        <div>
          <img className="hero-img" src={heroImg} alt="" />
        </div>
      </div>
    </section>
  );
}
