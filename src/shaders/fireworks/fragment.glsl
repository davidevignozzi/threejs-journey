uniform sampler2D uTexture;

void main() {
    // vec4 textureColor = texture(uTexture, gl_PointCoord);
    float textureAlpha = texture(uTexture, gl_PointCoord).r;

    // Final color
    gl_FragColor = vec4(1.0, 1.0, 1.0, textureAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}