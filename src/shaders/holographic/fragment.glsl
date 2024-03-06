uniform float uTime;

varying vec3 vPosition;

void main() {    

    //Stripes
    float stripes = mod((vPosition.y - uTime * 0.02) * 20.0, 1.0); // mod -> you send a value as a the first parameter and when that value reaches the second parameter it goes back to 0
    stripes = pow(stripes, 3.0);

    // Final color
    gl_FragColor = vec4(1.0, 1.0, 1.0, stripes);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}