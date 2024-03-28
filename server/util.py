
# to implement draw
def hasWinner(board):
    boardMatrix = []
    for i in range(0, 9, 3):
        boardMatrix.append(board[i:i+3])

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
    return "None"


def getMove(board, mark):
    myMark = mark
    otherMark = 'X' if mark == 'O' else 'O'
    def miniMax(board, mark, legalMoves, depth):
        winner = hasWinner(board)
        if winner == myMark:
            return 10 - depth
        elif winner == otherMark:
            return -10 + depth
        elif legalMoves == 0:
            return 0
        
        scores = [100]*9
        for i in range(9):
            if board[i] == None:
                board[i] = mark
                score = miniMax(board, otherMark if mark == myMark else myMark, legalMoves-1, depth+1)
                board[i] = None
    miniMax(board, mark, 9, 0)