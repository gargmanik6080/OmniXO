const Marks = ({ value, markInput }) => {
    return (
      <button className="square text-lg w-12 bg-black mb-5 mr-3" onClick={markInput}>
        {value === null ? "." : value}
      </button>
    );
  }
  
  export default Marks;