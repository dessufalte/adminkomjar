function Landbtn({buttonvalue}) {
    return(
        <div className="cursor-pointer transition-colors ease-out font-semibold hover:bg-purple-400 bg-gradient-to-r from-violet-500 via-indigo-500 to-teal-500 w-fit h-fit hover:from-teal-500 hover:via-violet-500 hover:to-indigo-500 py-2 px-4 rounded-full">
            {buttonvalue}
        </div>
    )
}
export default Landbtn;