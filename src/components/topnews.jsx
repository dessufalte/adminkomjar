const TopNews = () => {
  return (
    <div className="bg-slate-600 flex flex-col gap-2 rounded-md shadow-lg p-2 text-slate-200">
      <div className="">
        <h1 className="font-semibold">Title</h1>
      </div>
      <div className="text-sm">
        <p>lorem ipsum Lorem ipsum dog elit. Aliquid la Animi. ...</p>
      </div>
      <div className="text-sm gap-2 font-bold rounded-md flex flex-row items-center">
        <p>Baca selengkapnya</p>
        <i className="fa fa-arrow-circle-right cursor-pointer text-white"></i>
      </div>
    </div>
  );
};
export default TopNews;
