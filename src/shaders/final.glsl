precision highp float;

varying vec2 vUv;

uniform sampler2D texture;
uniform float zoomLevel;
uniform float hover;

float exponentialInOut(float t) {
  return t == 0.0 || t == 1.0 
    ? t 
    : t < 0.5
      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}

void main () {
  vec2 uv = vUv;

  float hoverLevel = exponentialInOut(
    min(1., (length(uv - .5) * hover) + hover)
  );

  uv *= 1. - zoomLevel * hoverLevel;
  uv += zoomLevel * 0.5 * hoverLevel;
  uv = clamp(uv, 0., 1.);

  vec4 color = texture2D(texture, uv);

  if (hoverLevel > 0.) {
    hoverLevel = 1. - abs(hoverLevel - .5) * 2.;

    // Pixel displace
    uv.y += color.r * hoverLevel * .05;
    color = texture2D(texture, uv);

    // RGBshift
    color.r = texture2D(texture, uv + hoverLevel * 0.01).r;
    color.g = texture2D(texture, uv - hoverLevel * 0.01).g;
  }

  gl_FragColor = color;
}