const Marks = ({ value, markInput }) => {
    return (
      <button className="square text-2xl w-12 bg-[#2d2d38] mb-5 mr-3 font-medium" onClick={markInput}>
        {value === null ? "." : value}
      </button>
    );
  }
  
  export default Marks;