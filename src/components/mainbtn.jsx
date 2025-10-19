const MainBtn = ({title}) => {
  return (
    <div className="bg-cyan-700 cursor-pointer align-middle hover:bg-teal-700 transition-all p-3 text-xs font-bold w-fit rounded-full text-white">
      <p>{title}</p>
    </div>
  );
};
export default MainBtn;