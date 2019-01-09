// Pointers
let p5canvas;

// The grid of nodes displayed on screen.
let grid = [];

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
    size_of_tile = p5canvas.width / e.options[e.selectedIndex].value;

    number_of_columns = Math.floor(p5canvas.width / size_of_tile);
    number_of_rows = Math.floor(p5canvas.height / size_of_tile);

    // apiSetGrid(number_of_rows, number_of_columns);

    // apiGetGrid();

    // Initial draw of grid.
    // for (var i = 0; i < number_of_columns; i++)
    // {
    //     for (var j = 0; j < number_of_rows; j++)
    //     {
    //         grid[i][j].draw();
    //     }
    // }

}

function apiSetGrid(rows, cols)
{
    fetch('http://localhost:5000/api/grid',
    {
        method: 'POST',
        body: JSON.stringify(
        {
            rows: rows,
            cols: cols
        }),
        headers: { "Content-Type": "application/json; charset=utf-8" }
    })
}

async function apiGetGrid()
{
    const response = await fetch('http://localhost:5000/api/grid')
    const json = await response.json()
    console.log(json)
    // .then((response) => response.json())
    // .then((data) => {
    //     let gridKey = Object.keys(data)[0];
    //     console.log("grid key: " + gridKey);
    //     grid = data[gridKey];
    //     console.log("grid length: " + grid.length);
    //     console.log("grid: " + grid[4][4]);

        // let n = grid[0][0];
        // Object.keys(n).forEach(function(key)
        // {
        //     console.log("key: " + key + " value: " + n[key]);
        // })

        // for (var i = 0; i < number_of_columns; i++)
        // {
        //     for (var j = 0; j < number_of_rows; j++)
        //     {
        //         let n = grid[i][j];
        //         Object.keys(n).forEach(function(key)
        //         {
        //             console.log("key: " + key + " value: " + n[key]);
        //         })
        //     }
        // }

    // })

    // .catch((err) => {
    //     console.log(err);
    // });
}

// function apiGetGrid()
// {
//     fetch('http://localhost:5000/api/test')
//     .then((response) => response.json())
//     .then((data) => {
//         let gridKey = Object.keys(data)[0];
//         console.log("grid key: " + gridKey);
//         grid = data[gridKey];
//         console.log("grid length: " + grid.length);
//         console.log("grid: " + grid[4][4]);

//         // let n = grid[0][0];
//         // Object.keys(n).forEach(function(key)
//         // {
//         //     console.log("key: " + key + " value: " + n[key]);
//         // })

//         // for (var i = 0; i < number_of_columns; i++)
//         // {
//         //     for (var j = 0; j < number_of_rows; j++)
//         //     {
//         //         let n = grid[i][j];
//         //         Object.keys(n).forEach(function(key)
//         //         {
//         //             console.log("key: " + key + " value: " + n[key]);
//         //         })
//         //     }
//         // }

//     })

//     .catch((err) => {
//         console.log(err);
//     });
// }

/**
 * Loop through grid and call draw.
 */
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
