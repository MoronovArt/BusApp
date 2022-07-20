const pointInPolygon = (polygon, point) => {
  let odd = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
    if (
      polygon[i][1] > point[1] !== polygon[j][1] > point[1] &&
      point[0] <
        ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1])) /
          (polygon[j][1] - polygon[i][1]) +
          polygon[i][0]
    ) {
      odd = !odd;
    }
    j = i;
  }
  return odd;
};
