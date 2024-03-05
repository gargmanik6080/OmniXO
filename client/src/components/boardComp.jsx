import Marks from "./marks";
const BoardComp = ({ squares, onMarkClick }) => {
  const renderSquare = (i) => {
    return (
      <Marks value={squares[i]} markInput={() => onMarkClick(i)} key={i} />
    );
  };

  return (
    <div className="board-container border border-b-lg border-white bg-white">
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

export default BoardComp;
