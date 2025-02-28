import "../componentscss/Add.css";

const Add = ({ movieId, isAdded, onAdd, onRemove }) => {
    const handleClick = (e) => {
        const button = e.currentTarget;
        button.classList.toggle("active");

        if (isAdded) {
            onRemove(movieId); // Remove from DB
        } else {
            onAdd(); // Add to DB
        }
    };

    return (
        <button className={`add ${isAdded ? "active" : ""}`} onClick={handleClick}>
            <span className="line horizontal"></span>
            <span className="line vertical"></span>
        </button>
    );
};

export default Add;
