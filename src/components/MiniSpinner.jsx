import { Grid } from "react-loader-spinner";

function MiniSpinner() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/40  flex flex-col items-center justify-center space-y-1">
      <p className="text-white font-bold">Processing</p>
      <Grid
        height="80"
        width="80"
        color="black"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default MiniSpinner;
