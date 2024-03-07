uniform sampler2D uTexture;
uniform vec3 uColor;

void main() {
    // vec4 textureColor = texture(uTexture, gl_PointCoord);
    float textureAlpha = texture(uTexture, gl_PointCoord).r;

    // Final color
    gl_FragColor = vec4(uColor, textureAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}