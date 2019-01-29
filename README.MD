# Flask_AI

A web site created with Python Flask, to showcase Artificial Intelligence projects.
Further to this an API to create nodes on a grid, so all the code previously coded in Javascript can be rewritten in Python.
The idea behind this project is to improve upon my Python for the next upcoming University module.
___

# API

## Usage

All reponses will have the following form:

```json
{
    "data": "Mixed type holding the contents of the response",
    "message": "Description of what happened"
}
```

Subsequent response definitions will only detail the expected value of the `data field`.

### Grid

**Definition**

`GET /grid`

**Response**
- `200 OK` on success

```json
[
    {
        "grid": "json representation of 2d array"
    }
]
```

**Definition**

`POST /grid/<size>`

**Arguments**

- `"Size":int` the size of the 2d array to be created.

**Response**
- `201 OK` created success

## What I learnt

* How to setup a development environment with Python 3.7.0.
* How to setup a virtual environment for Python to run in.
* Instantiate a Python_flask and Python_restful environment
* Improved on my knowledge of Python and data structures.
* API endpoints
* Dynamically creating JSON multi array in Python and parsing this.
* From Javascript GET and PUT to my API and decoding the JSON into Key/Value pairs to create a multi array.
* Improved my knowledge of Javascript ES6 functions:  asynchronous, promise.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
