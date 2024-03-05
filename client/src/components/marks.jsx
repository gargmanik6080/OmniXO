const Marks = ({ value, markInput }) => {
    return (
      <button className="square text-lg w-12 bg-white" onClick={markInput}>
        {value === null ? "_" : value}
      </button>
    );
  }
  
  export default Marks;