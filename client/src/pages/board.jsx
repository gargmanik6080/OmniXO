import BoardComp from "../components/boardComp";
import { useEffect, useState } from "react";

const Board = () => {
	const [currBoard, setCurrBoard] = useState([null, null, null, null, null, null, null, null, null]);
	const [currPlayer, setCurrPlayer] = useState("");
	const [statusText, setStatusText] = useState("");
	const [botMark, setBotMark] = useState("");
	const [gameStatus, setGameStatus] = useState("Running");
	const handleClick = (ind) => {
		console.log("clicked " + ind);
		if (currBoard[ind] != null) {
			console.log("Space already Marked!!!");
			return;
		}
		if(gameStatus == "Over"){
			alert("The game is Over!!!");
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
			};

			getNewBoard().then((data) => {

				console.log(data);
				setCurrBoard(data.newBoard);
				if(data.winner == "Draw"){
					setStatusText("Game Drawn!!!");
					setGameStatus("Over");
					return;
				}
				else if(data.winner == botMark){
					setStatusText("You Lose!!!");
					setGameStatus("Over");
					return;
				}
				else if(data.winner == currPlayer){
					setStatusText("You Win!!!");
					setGameStatus("Over");
					return;
				}
				else setCurrPlayer(botMark == "X" ? "O" : "X")
			});
		} else {
			setStatusText("Your Turn to Move...");
			return;
		}
		// setCurrPlayer(currPlayer === 'X' ? 'O' : 'X')
	}, [currPlayer]);

	// showing option to play again if game is over
	useEffect(() => {
		if (gameStatus == "Over") {
			document.getElementById("play-again").innerHTML = "Play again?";
		}
	},[gameStatus]);

	const newGame = () => {
		setCurrBoard([null, null, null, null, null, null, null, null, null]);
		setStatusText("");
		setGameStatus("Running")
		const randMark = Math.floor(Math.random() * 2);
		if (randMark == 0) {
			setCurrPlayer("X");
			setBotMark("O");
		} else {
			setCurrPlayer("O");
			setBotMark("X");
		}
		// removing play again button
		document.getElementById("play-again").innerHTML = "";
	}
	return (
		<div>
			<BoardComp squares={currBoard} onMarkClick={handleClick} />
			<div className="status text-white" id="status">
				{statusText}
			</div>

			<button className="play-again btn p-4 hover:bg-gray-700 rounded mt-4 font-bold" id="play-again" onClick={newGame}></button>
		</div>
	);
};

export default Board;
