const CardSkeleton = () => {
  const data = Array(8).fill(0);
  return (
    <div className="flex flex-row flex-wrap gap-8 justify-center">
      {data.map((item, index) => {
        const delay = `${index}00ms`.toString();
        return (
          <div
            className="border-2 border-slate-300 rounded-lg p-4"
            style={{
              animationDelay: delay,
              animationFillMode: "backwards",
            }}
            key={index}
          >
            <div className="rounded-lg h-96 w-96 bg-white/50 animate-pulse" />
            <div className="pt-5 flex flex-row justify-between items-center ">
              <div className="flex-col flex ">
                <h4 className=" bg-white/50 animate-pulse text-3xl text-extrabold h-5 w-16 mb-5 rounded-lg" />
                <p className=" bg-white/50 animate-pulse text-xl text-extrabold pt-2 w-40  h-5 rounded-lg" />
              </div>
              <button
                className=" bg-white/50 animate-pulse text-brand-primary rounded-lg w-1/4 h-11  font-medium   tracking-wider "
                disabled
              ></button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardSkeleton;
