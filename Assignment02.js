"use strict";

// declare global variables
let gl; 
let points;
let colors;

window.onload = function init()
{
    let canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    //
    //  Initialize our data for a single triangle
    //
    //
    //  Initialize our data for the triangles
    //
    //(red, green, blue) values for all of the vertices
    colors = [
        vec3(1.0, 1.0, 1.0), //colors for first Triangle
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 1.0, 1.0),
        vec3(0.0, 0.0, 0.0), //2nd triangle
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 0.0, 0.0), //3rd triangle
        vec3(0.0, 0.0, 0.0),
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 0.0, 0.0), //red strip
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, 0.0, 0.0),
        vec3(1.0, .55, 0.0), //orange strip
        vec3(1.0, .55, 0.0),
        vec3(1.0, .55, 0.0),
        vec3(1.0, .55, 0.0),
        vec3(1.0, .55, 0.0),
        vec3(1.0, .55, 0.0),
        vec3(1.0, 1.0, 0.0), //yellow strip
        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 1.0, 0.0),
        vec3(1.0, 1.0, 0.0),
        vec3(0.0, 1.0, 0.0), //green strip
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0), //blue strip
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(1.0, 0.0, 1.0), //purple strip
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 0.0, 1.0),
        vec3(1.0, 1.0, 1.0), //white strip
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 1.0, 1.0),
        vec3(1.0, 1.0, 1.0),
    ];

    // And, add our vertices point into our array of points
    points = [
        vec2(-.7, -.5 ), //White triangle
        vec2( .7, -.5 ), 
        vec2(0.0,  .7 ), 
        vec2(-.65, -.475), //Black triangle on top of white
        vec2(.65, -.475),
        vec2( .0, .65),
        vec2( .2, .3), //Intertior white-black triangle
        vec2( .3, .1),
        vec2(-.29, .22),
        vec2( .23, .3), //red strip
        vec2(1.0, .25),
        vec2(1.0, .0),
        vec2( .23, .3), //added fat to red strip
        vec2( .25, .27),
        vec2( .4, .26),
        vec2( .25, .27), //orange strip
        vec2(1.0, .22),
        vec2(1.0, .0),
        vec2( .25, .27), //added fat to orange strip
        vec2( .27, .24),
        vec2( .42, .23),
        vec2( .265, .245), //yellow strip
        vec2(1.0, .17),
        vec2(1.0, 0.0),
        vec2( .265, .245), //added fat to yellow strip
        vec2( .285, .21),
        vec2( .44, .20),
        vec2( .285, .217), //green strip
        vec2(1.0, .12),
        vec2(1.0, 0.0),
        vec2( .281, .215), //added fat to green strip
        vec2( .305, .18),
        vec2( .68, .12),
        vec2( .305, .18), //blue strip
        vec2(1.0, .07),
        vec2(1.0, 0.0),
        vec2( .305, .18), //added fat to blue strip
        vec2( .351, .10),
        vec2( .7, .09),
        vec2( .328, .14), //purple strip
        vec2(1.0, .035),
        vec2(1.0, 0.0),
        vec2( .328, .14), //add fat to purple strip
        vec2( .35, .10),
        vec2(1.0, 0.0),
        vec2(-.28, .22), //white strip
        vec2(-1.0, .14),
        vec2(-1.0, .10),
        vec2( -.28, .22), //added fat to white strip
        vec2( -.27, .20),
        vec2(-1.0, .10),
        ];

    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
    
    // Load the data into the GPU

    let bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    let aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}
