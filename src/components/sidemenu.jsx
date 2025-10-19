import react from "react";
const SideMenu = () => {
  const [ListCat, setListCat] = react.useState([
    { id: 1, title: "Acara", toggle: true },
    { id: 2, title: "Kegiatan", toggle: false },
    { id: 3, title: "Penghargaan", toggle: false },
  ]);
  const handleToggle = (index) => {
    const updatedList = ListCat.map((item, i) => ({
      ...item,
      toggle: i === index,
    }));
    setListCat(updatedList);
  };
  return (
    <div className="fixed z-10 h-screen md:w-52 lg:w-56 flex flex-col pt-16 bg-slate-800">
      {ListCat.map((element, index) => (
        <div
          key={element.id}
          onClick={() => handleToggle(index)}
          className={`border-b md:p-2 lg:p-4 sm:p-1 border-slate-500 text-slate-300 hover:bg-slate-600 hover:cursor-pointer ${
            element.toggle ? "bg-slate-700" : ""
          }`}
        >
          {element.title}
        </div>
      ))}
    </div>
  );
};
export default SideMenu;
