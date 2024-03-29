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
    # Checking if the user has won
    winner = hasWinner(board)
    if winner != "None":
        return jsonify({'newBoard': board, "winner": winner})
    
    move = getMove(board, mark)
    print("Move " , move)
    board[move] = mark
    winner = hasWinner(board)
    if winner == "Draw":
        return jsonify({'newBoard': board, "winner": "Draw"})
    elif winner != "None":
        return jsonify({'newBoard': board, "winner": winner})
    return jsonify({'newBoard': board, "winner": "None"})


# Running the Flask app

app.run(host='0.0.0.0', port=80)