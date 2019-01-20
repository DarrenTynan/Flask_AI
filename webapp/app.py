from flask import Flask, render_template, json, Response, Request
from flask_restful import Resource, Api
from flask_restful import reqparse
# from my_ai_module.Array2d import test

print('app.py: %s' % __name__)
# Array2d.test()

app = Flask(__name__)
# app.debug = True
api = Api(app)

# a2d = my_ai_module.Array2d()
# a2d.test()

@app.route('/')
def index():
    title = 'Data Structures and Algorithms'        
    return render_template('index.html', title=title)

@app.route('/bfs')
def bfs():
    title = 'Breadth First Search'
    return render_template('bfs.html', title=title)

class Grid(Resource):
    grid = []
    rows = 0
    cols = 0
    size = 0;

    def get(self):
        print(Grid.grid)

        if Grid.grid:
            return {'grid': Grid.grid}, 200

        return {'data': 'grid not found'}, 200

    def post(self):
        # Empty grid array
        Grid.grid = []

        # Set up the args parser
        parser = reqparse.RequestParser()
        parser.add_argument('rows', required=True)
        parser.add_argument('cols', required=True)
        parser.add_argument('size', required=True)
        args = parser.parse_args()
 
        rows = int(args['rows'])
        cols = int(args['cols'])
        size = int(args['size'])

        for r in range(rows):
            row = []
            for c in range(cols):
                nodeObj = {
                        "id": "blank",
                        "x": c, "y": r,
                        "x": 0, "y": 0,
                        "drawX": size * c, "drawY": size * r,
                        "size": size,
                        "visited": False,
                        "parent": None
                    }
                row.append(nodeObj)                
            Grid.grid.append(row)

        return {'message':'success', 'length': sum(len(x) for x in Grid.grid), 'grid': Grid.grid}, 201

api.add_resource(Grid, '/api/grid')

if __name__ == '__main__':
    app.run(debug=True)