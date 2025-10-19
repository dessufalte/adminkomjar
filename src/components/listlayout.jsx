const ListLayout = ({children}) => {
    return(
        <div className="flex border-l border-r border-slate-600 flex-col px-4 col-span-3 gap-6 justify-center w-full p-2 bg-slate-700 py-6">
            {children}
           
        </div>
    )
}

export default ListLayout