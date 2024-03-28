
# to implement draw
def hasWinner(board):
    boardMatrix = []
    for i in range(0, 9, 3):
        boardMatrix.append(board[i:i+3])

    # Checking rows and columns
    for i in range(3):
        if boardMatrix[i][0] == boardMatrix[i][1] == boardMatrix[i][2] and boardMatrix[i][0] != None:
            return True
        if boardMatrix[0][i] == boardMatrix[1][i] == boardMatrix[2][i] and boardMatrix[0][i] != None:
            return True
        
    # Checking diagonals
    if boardMatrix[0][0] == boardMatrix[1][1] == boardMatrix[2][2] and boardMatrix[0][0] != None:
        return True
    if boardMatrix[0][2] == boardMatrix[1][1] == boardMatrix[2][0] and boardMatrix[0][2] != None:
        return True
    return False


# def getMove(board, mark):
    