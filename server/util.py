
# to implement draw
def hasWinner(board):
    boardMatrix = []
    markCount = 0
    for i in range(0, 9, 3):
        boardMatrix.append(board[i:i+3])
        markCount += board[i:i+3].count('X') + board[i:i+3].count('O')

    if markCount < 5:
        return "None"
    # Checking rows and columns
    for i in range(3):
        if boardMatrix[i][0] == boardMatrix[i][1] == boardMatrix[i][2] and boardMatrix[i][0] != None:
            return boardMatrix[i][0]
        if boardMatrix[0][i] == boardMatrix[1][i] == boardMatrix[2][i] and boardMatrix[0][i] != None:
            return boardMatrix[0][i]
        
    # Checking diagonals
    if boardMatrix[0][0] == boardMatrix[1][1] == boardMatrix[2][2] and boardMatrix[0][0] != None:
        return boardMatrix[0][0]
    if boardMatrix[0][2] == boardMatrix[1][1] == boardMatrix[2][0] and boardMatrix[0][2] != None:
        return boardMatrix[0][2]
    if markCount == 9:
        return "Draw"
    return "None"


def getMove(board, mark):
    myMark = mark
    otherMark = 'X' if mark == 'O' else 'O'
    def miniMax(board, mark, depth):
        winner = hasWinner(board)
        if winner == myMark:
            return 10 - depth, None
        elif winner == otherMark:
            return -10 + depth, None
        elif winner == "Draw":
            return 0, None
        
        scores = [-100]*9
        if mark != myMark:
            scores = [100]*9
        for i in range(9):
            if board[i] is None:
                board[i] = mark
                score, _ = miniMax(board, otherMark if mark == myMark else myMark, depth+1)
                # print("score : " , score)
                scores[i] = score
                board[i] = None
        if mark == myMark:
            return max(scores), scores.index(max(scores))
        else:
            return min(scores), scores.index(min(scores))
    
    _ , index = miniMax(board, mark, 0)
    return index