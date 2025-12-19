function PointsCircles({ maxPoints }: { maxPoints: number }): JSX.Element {

  const createCircles = (numCircles = 0) => {
    const circles = [];
    for (let i = 1; i <= numCircles; i++) {
      circles.push(
        <div
          key={`sw00${i}`}
          id={`sw00${i}`}
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 text-slate-500 dark:text-slate-400 font-bold text-lg shadow-md transition-all duration-300 cursor-default select-none"
        >
          {i}
        </div>
      );
    }
    return circles;
  };


  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-sm mx-auto">
      {createCircles(maxPoints)}
    </div>
  );
}

export default PointsCircles;

