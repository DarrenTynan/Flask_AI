// Pointers
let p5canvas;

// The grid of nodes displayed on screen.
let grid = [];
let gridObj = {};

// The following are calculated from UI settings.
let number_of_columns;
let number_of_rows;
let size_of_tile;

// Temp for now!
let source = null;
let target = null;

let animate = false;

/**
 * p5 setup function.
 */
function setup()
{
    // Get width of <div>
    var p5canvas_width = document.getElementById("p5canvas").offsetWidth;

    // Create and set p5canvas size.
    p5canvas = createCanvas(p5canvas_width, p5canvas_width);
    // background(255);

    // Set as child of <div>
    p5canvas.parent("p5canvas");

    // Assign mouse presses to only register on canvas.
    p5canvas.mousePressed(checkCanvasMouse);

    // Clear vars for 'Update Grid!'.
    background(255);
    source = null;
    target = null;

    // Get the wall frequency
    var e = document.getElementById("selectWallFrequency");
    var wallFrequency = e.options[e.selectedIndex].value;

    // Get grid size.
    e = document.getElementById("selectGridSize");
    size_of_tile = Math.floor(p5canvas.width / e.options[e.selectedIndex].value);
    number_of_columns = Math.floor(p5canvas.width / size_of_tile);
    number_of_rows = Math.floor(p5canvas.height / size_of_tile);

    // Build the grid with an api call.
    apiSetGrid(number_of_rows, number_of_columns, size_of_tile);

    // Return from a fetch promise and act accordingly.
    let result = apiGetGrid();
    result.then(function(result)
    {
        gridObj = result;
        console.log("**** gridObj in promise ****");
        // Debug - get keys and values
        for (const [key, value] of Object.entries(gridObj[0][0]))
        {
            console.log(key + " = " + value);
        }
        console.log("*********************");

        // Initial draw of grid.
        for (var i = 0; i < number_of_columns; i++)
        {
            for (var j = 0; j < number_of_rows; j++)
            {
                rect(gridObj[i][j].drawX + 2, gridObj[i][j].drawY + 2, gridObj[i][j].size - 4, gridObj[i][j].size - 4);
            }
        }
    })

    console.log(Object.entries(gridObj[0][0]));

    console.log("**** gridObj outside of promise ****");
    // Debug - get keys and values
    for (const [key, value] of Object.entries(gridObj[0][0]))
    {
        console.log(key + " = " + value);
    }
    console.log("*********************");

}

/**
 * API call to set the grid.
 * 
 * @param {*} rows - number of rows
 * @param {*} cols - number of columns
 * @param {*} size - the size of each node
 */
function apiSetGrid(rows, cols, size)
{
    fetch('http://localhost:5000/api/grid',
    {
        method: 'POST',
        body: JSON.stringify(
        {
            rows: rows,
            cols: cols,
            size: size
        }),
        headers: { "Content-Type": "application/json; charset=utf-8" }
    })
}


/**
 * Asynchronous functions to fetch json grid from api.
 */
async function apiGetGrid()
{
    try
    {
        let response = await fetch('http://localhost:5000/api/grid')
        let json = await response.json()
    
        let gridKey = Object.keys(json)[0];
        let grid = json[gridKey];

        return grid; 
    }

    catch(err)
    {
        console.log(err);
    };
}

function draw()
{
}

/**
 * If LMB, check were; tile or UI.
 */
function checkCanvasMouse()
{
    var nx = 0;
    var ny = 0;

    if (mouseX <= size_of_tile && mouseY <= size_of_tile)
    {
        nx = 0;
        ny = 0;
    }
    else
    {
        // Thought process.
        // Click at [ 237 ; 112 ]
        // Blocks of 10x10
        // Grid index = [ 237/10 ; 112/10 ] = [ 23.7 ; 11.2 ]
        // Round them to get the "closest"
        // Block indices are 24;11

        var grid_index_x = mouseX / size_of_tile;
        var grid_index_y = mouseY / size_of_tile;

        // Node on grid identified.
        nx = Math.floor(grid_index_x);
        ny = Math.floor(grid_index_y);
    }

    // Check radio buttons.
    if (document.getElementById("checkInfo").checked)
    {
        document.getElementById('debug_nodeX').innerHTML = nx;
        document.getElementById('debug_nodeY').innerHTML = ny;
        document.getElementById('debug_id').innerHTML = grid[ny][nx].id;
    }

    if (document.getElementById("checkSource").checked)
    {
        grid[ny][nx].id = "source";
        source = grid[ny][nx];
        grid[ny][nx].draw();
    }

    if (document.getElementById("checkTarget").checked)
    {
        grid[ny][nx].id = "target";
        target = grid[ny][nx];
        grid[ny][nx].draw();
    }

    if (document.getElementById("checkWall").checked)
    {
        grid[ny][nx].id = "wall";
        grid[ny][nx].draw();
    }

    if (document.getElementById("checkBlank").checked)
    {
        grid[ny][nx].id = "blank";
        grid[ny][nx].draw();
    }
}

