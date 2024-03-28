import BoardComp from "../components/boardComp";
import { useEffect, useState } from "react";

const Board = () => {
	const [currBoard, setCurrBoard] = useState([null, null, null, null, null, null, null, null, null]);
	const [currPlayer, setCurrPlayer] = useState("");
	const [statusText, setStatusText] = useState("");
	const [botMark, setBotMark] = useState("");
	const handleClick = (ind) => {
		console.log("clicked " + ind);
		if (currBoard[ind] != null) {
			console.log("Space already Marked!!!");
			return;
		}
		if (currPlayer == botMark) {
			alert("Not Your Turn");
			return;
		}
		let newBoard = [...currBoard];
		newBoard[ind] = currPlayer;
		setCurrBoard(newBoard);
        setCurrPlayer(botMark);
		console.log(currBoard);
	};

	useEffect(() => {
		// getting random player n set botMark
		const randMark = Math.floor(Math.random() * 2);
		if (randMark == 0) {
			setCurrPlayer("X");
			setBotMark("O");
		} else {
			setCurrPlayer("O");
			setBotMark("X");
		}
	}, []);
	// useEffect(() => {
	// 	// checking for win n changing player
	// }, [currBoard]);
	useEffect(() => {
		// waiting for player to make a move or Thinking...
		console.log("Player Set to " + currPlayer + " and bot to " + botMark);

		// console.log("Player changed")
		if (currPlayer === botMark && currPlayer != "") {
			setStatusText("Thinking..."); // bot move
			// getting board after bot move
			const getNewBoard = async () => {
				return await fetch("http://127.0.0.1:5000/move", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
					body: JSON.stringify({
						board: currBoard,
						player: botMark,
					}),
				})
					.then((res) => {
						return res.json();
					})
					// .then((data) => {
					// 	return data.newBoard;
					// });
			};

			getNewBoard().then((data) => {
				// console.log("Bot Move: " + move);
				// let newBoard = [...currBoard];
				// newBoard[move] = botMark;
				console.log(data.winner);
				setCurrBoard(data.newBoard);
				if(data.winner != "null"){
					setStatusText(data.winner + " Won!!!");
					return;
				}
                setCurrPlayer(botMark == "X" ? "O" : "X")
			});
		} else {
			setStatusText("Your Turn to Move...");
			return;
		}
		// setCurrPlayer(currPlayer === 'X' ? 'O' : 'X')
	}, [currPlayer]);

	return (
		<div>
			<BoardComp squares={currBoard} onMarkClick={handleClick} />
			<div className="status text-white" id="status">
				{statusText}
			</div>
		</div>
	);
};

export default Board;
