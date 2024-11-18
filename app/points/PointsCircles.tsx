function PointsCircles({ maxPoints }: { maxPoints: number }): JSX.Element {

  const createCircles = (numCircles = 0) => {
    let circle = [];
    for (let i = 1; i <= numCircles; i++) {
      circle.push(
        <div key={`sw00${i}`} className="circle" id={`sw00${i}`}>
          {i}
        </div>
      );
    }
    return circle;
  };


  return (
    <div>
      {createCircles(maxPoints)}
    </div>
  );
}

export default PointsCircles;
