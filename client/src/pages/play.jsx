import { NavLink } from 'react-router-dom';

const Play = () => {
  return (
    <div className="play-container">
      <NavLink to="/board" className="play-button">
        Play
      </NavLink>
    </div>
  );
};

export default Play;
