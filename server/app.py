import sys
from flask import Flask, jsonify, request
from util import *
from flask_cors import CORS
from waitress import serve

# Force immediate output flushing
sys.stdout.reconfigure(line_buffering=True)

app = Flask(__name__)
CORS(app)

# Log all incoming requests
@app.before_request
def log_request():
    print(f"Incoming request: {request.method} {request.url}")

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


@app.route('/api/move', methods=['POST'])
def api_move():
    return make_move()  # Call the same function

# Running the Flask app
if __name__ == '__main__':
    # Print before starting the server
    print(f"Starting server on port 80 of the container...")
    try:
        serve(app, host='0.0.0.0', port=80)
    except KeyboardInterrupt:
        print("\nServer stopped")