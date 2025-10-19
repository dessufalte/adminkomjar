function Flexlayout({ children }) {
    return (
      <div className=" flex justify-center items-center gap-2 p-2 bg-slate-800 w-full">
        {children}
      </div>
    );
  }
  export default Flexlayout;
  