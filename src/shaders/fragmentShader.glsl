precision highp float;

varying vec2 vUv;

uniform float zoomLevel;
uniform float hover;

/* Easing Expo InOut equation */
/* Adapted from Robert Penner easing equations */
float easeExpoInOut(float t) {
    t = t * 2.0;
    if (t == 0.0) return 0.0;
    if (t == 1.0) return 1.0;
    if (t < 1.0) return 0.5 * pow(2.0, 10.0 * (t - 1.0));
    return 0.5 * (-pow(2.0, -10.0 * --t) + 2.0);
}

void main () {
  vec2 uv = vUv;

  float hoverLevel = easeExpoInOut(min(1., distance(vec2(.5), uv) * hover + hover));

  vec3 color = vec3(hoverLevel);

  gl_FragColor = vec4(color, 1.);
}

/*
* Aplicar un Zoom sencillo a la textura con el uniform zoomLevel
*/