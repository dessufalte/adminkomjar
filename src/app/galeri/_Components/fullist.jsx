const FullList = ({ children }) => {
  return (
    <div className="flex border-l border-r border-slate-600 flex-col px-4 col-span-4 gap-6 p-2 bg-slate-700 py-6">
      {children}
    </div>
    
  );
};

export default FullList;
