from flask import Flask, jsonify

app = Flask(__name__)

# Define a route for the root endpoint
@app.route('/')
def index():
    return 'Welcome to the Tic-Tac-Toe backend!'

# Define a route to handle Tic-Tac-Toe moves
@app.route('/move', methods=['POST'])
def make_move():
    # Here you would handle the Tic-Tac-Toe move logic
    # This is just a placeholder example
    move = {"row": 1, "column": 2}
    return jsonify(move)

if __name__ == '__main__':
    app.run(debug=True)
