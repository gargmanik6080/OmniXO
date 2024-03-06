from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Define a route for the root endpoint
@app.route('/')
def index():
    return 'Welcome to the Tic-Tac-Toe backend!'

# Define a route to handle Tic-Tac-Toe moves
@app.route('/move', methods=['POST'])
def make_move():
    board = request.json.get('board')
    print(board)
    for i,cell in enumerate(board):
        if not cell :
            return jsonify({'move': i})
    return jsonify({'move': 'null'})


if __name__ == '__main__':
    app.run(debug=True)
