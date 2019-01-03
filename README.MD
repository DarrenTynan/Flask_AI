# Flask_AI

A web site created with Python Flask, to showcase Artificial Intelligence projects.
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


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
