from flask import Flask, render_template, json, Response, Request
from flask_restful import Resource, Api

from flask_restful import reqparse

app = Flask(__name__)
app.debug = True
api = Api(app)

posts = [
    {
        'author': 'Darren',
        'title': 'Post title'
    }
]

@app.route('/')
def index():
    title = 'Data Structures and Algorithms'        
    return render_template('index.html', title=title, posts=posts)

@app.route('/bfs')
def bfs():
    title = 'Breadth First Search'
    return render_template('bfs.html', title=title)

#####################################################
class Test(Resource):
    testGrid = []
    rows = 0
    cols = 0

    def get(self):
        print(Test.testGrid)

        if Test.testGrid:
            return {'testGrid found': Test.testGrid}, 200

        return {'data': 'testGrid not found'}, 200

    def post(self):
        # Empty grid array
        Test.testGrid = []

        # Set up the args parser
        parser = reqparse.RequestParser()
        parser.add_argument('rows', required=True)
        parser.add_argument('cols', required=True)
        args = parser.parse_args()
 
        rows = int(args['rows'])
        cols = int(args['cols'])
 
        print("rows: " + str(rows))
        print("cols: " + str(cols))

        for r in range(rows):
            row = []
            for c in range(cols):
                # Before type was <class 'dict'>
                # serialized = json.dumps(nodeObj)
                # row.append(serialized)
                # After serialized type is <class # 'str'>
                nodeObj = {
                        "id": "blank",
                        "x":c, "y":r,
                        "x": 0, "y": 0,
                        "drawX": 0, "drawY": 0,
                        "visited": False,
                        "parent": None
                    }
                serialized = json.dumps(nodeObj)
                row.append(serialized)                
                # row.append(nodeObj                
            Test.testGrid.append(row)

        return {'message':'success', 'length': sum(len(x) for x in Test.testGrid), 'grid': Test.testGrid}, 201
        # return Response(json.dumps(Grid.grid), mimetype='application/json')

api.add_resource(Test, '/api/test')

#####################################################
class Grid(Resource):
    grid = []
    rows = 0
    cols = 0

    messsage = "Test return"

    def get(self):
        return {'data': self.message}, 200

        # if self.grid:
            # return {'grid': self.grid}, 200

    def post(self):
        self.grid = []
        parser = reqparse.RequestParser()
        parser.add_argument('rows', required=True)
        parser.add_argument('cols', required=True)
        args = parser.parse_args()

        self.rows = int(args['rows'])
        self.cols = int(args['cols'])

        for r in range(self.rows):
            self.row = []
            for c in range(self.cols):
                # Before type was <class 'dict'>
                # serialized = json.dumps(nodeObj)
                # row.append(serialized)
                # After serialized type is <class 'str'>
                nodeObj = { "id": "blank",
                            "x": 0, "y": 0,
                            "drawX": 0, "drawY": 0,
                            "visited": False,
                            "parent": None
                        }
                self.row.append(nodeObj)           
            self.grid.append(self.row)

        return {'message':'success', 'length': sum(len(x) for x in self.grid)}, 201

api.add_resource(Grid, '/api/grid')

# @app.route('/api/grid')
# # [(row)y][(col)x]
# def grid():
#     grid = []
#     rows = 10
#     cols = 5

#     index = 0
#     for r in range(rows):
#         row = []
#         for c in range(cols):
#             row.append(index)
#             index += 1
#         grid.append(row)
    
#     # Create an array of classes
#     nodes = []
#     for i in range(index):
#         n = Node()
#         n.index = i
#         nodes.append(n)

#     # x = 0
#     # y = 0
#     # for c in range(rows):
#     #     grid[c][x] = 1

#     n = Node()
#     print(n)
#     return Response(json.dumps(grid), mimetype='application/json')

# class Node:
#     index = 0
#     x = 0
#     y = 0

if __name__ == '__main__':
    app.run()
