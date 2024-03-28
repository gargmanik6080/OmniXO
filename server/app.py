from flask import Flask, jsonify, request
from util import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Defining a route for the root endpoint
@app.route('/')
def index():
    return 'Welcome to the Tic-Tac-Toe backend!'

# Defining a route to handle Tic-Tac-Toe moves
@app.route('/move', methods=['POST'])
def make_move():
    board = request.json.get('board')
    mark = request.json.get('player')
    getMove(board, mark)
    # Checking if the user has won
    winner = hasWinner(board)
    if winner != "None":
        return jsonify({'newBoard': board, "winner": winner})
    
    for i,cell in enumerate(board):
        if not cell :
            board[i] = mark
            win = hasWinner(board)
            if winner != "None":
                return jsonify({'newBoard': board, "winner": winner})
            else:
                return jsonify({'newBoard': board, "winner": "None"})
    return jsonify({'move': 'null', "winner":"Draw"})


app.run(debug=True)
