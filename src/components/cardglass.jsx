import "./landpage.css";
import "./landbtn";
import Landbtn from "./landbtn";

function Cardglass({ title, children, imglink }) {
  return (
    <div className="text-sm max-w-fit rounded-md text-balance p-4 bg-slate-700">
      <div className="flex flex-row">
        <div className="">
        <h1 className="text-2xl font-thin my-1 text-slate-200">{title}</h1>
        <p className="text-slate-200 mt-1">{children}</p>
        </div>
        <img
          className="max-w-96 rounded-md opacity-70"
          src={imglink}
          alt=""
        />
      </div>
    </div>
  );
}

export default Cardglass;
