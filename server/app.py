from flask import Flask, jsonify, request
from util import hasWinner
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
    if hasWinner(board):
        return jsonify({'newBoard': board, "winner": "You"})
    
    for i,cell in enumerate(board):
        if not cell :
            board[i] = mark
            if hasWinner(board):
                return jsonify({'newBoard': board, "winner": "Bot"})
            else:
                return jsonify({'newBoard': board, "winner": "null"})
    return jsonify({'move': 'null'})


app.run(debug=True)
