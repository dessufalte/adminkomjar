

const ListView = ({ children }) => {
  return (
    <div className="p-2 w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 w-full gap-2">{children}</div>
    </div>
  );
};

export default ListView;
