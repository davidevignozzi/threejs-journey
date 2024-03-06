uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {    
    // Normal
    vec3 normal = normalize(vNormal);

    //Stripes
    float stripes = mod((vPosition.y - uTime * 0.02) * 20.0, 1.0); // mod -> you send a value as a the first parameter and when that value reaches the second parameter it goes back to 0
    stripes = pow(stripes, 3.0);

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    // Holographic
    float holographic = stripes * fresnel;
    holographic += fresnel * 1.25;

    // Final color
    gl_FragColor = vec4(1.0, 1.0, 1.0, holographic);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}