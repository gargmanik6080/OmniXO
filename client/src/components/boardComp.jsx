import Marks from "./marks";
const BoardComp = ({ squares, onMarkClick }) => {
  const renderSquare = (i) => {
    return (
      <Marks value={squares[i]} markInput={() => onMarkClick(i)} key={i} />
    );
  };

  return (
    <div className="board-container border-white">
      <div className="board-row ">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

import PropTypes from 'prop-types';
BoardComp.propTypes = {
  squares: PropTypes.array.isRequired,
  onMarkClick: PropTypes.func.isRequired
};

export default BoardComp;