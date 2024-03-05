import BoardComp from "../components/boardComp"
import { useEffect, useState } from "react"

const Board = () => {
    const [currBoard, setCurrBoard] = useState([null, null, null, null, null, null, null, null, null])
    const [currPlayer, setCurrPlayer] = useState('')
    const [statusText, setStatusText] = useState('')
    const [botMark, setBotMark] = useState('')
    const handleClick = (ind) => {
        console.log('clicked ' + ind)
        if(currBoard[ind] != null) {
            console.log("Space already Marked!!!")
            return ;
        }
        let newBoard = [...currBoard];
        newBoard[ind] = currPlayer;
        setCurrBoard(newBoard)
        console.log(currBoard)
    }

    useEffect(() => {
        // getting random player n set botMark
        const randMark = Math.floor(Math.random() * 2);
        if(randMark == 0) {
            setCurrPlayer('X')
            setBotMark('O')
        }
        else {
            setCurrPlayer('O')
            setBotMark('X')
        }

        console.log("Player Set")
    }, [])
    useEffect(() => {
        // checking for win n changing player
        setCurrPlayer(currPlayer === 'X' ? 'O' : 'X')
        // console.log("Board Updated")
    }, [currBoard])
    useEffect(() => {
        // waiting for player to make a move or Thinking...
        // console.log("Player changed")
        if(currPlayer == botMark){
             setStatusText("Thinking...");
        }
        else {
            setStatusText("Your Turn");
        }
    }, [currPlayer])


    return (
        <div>
            <BoardComp squares={currBoard} onMarkClick={handleClick}/>
            <div className="status" id="status">{statusText}</div>
        </div>
    )
}

export default Board
