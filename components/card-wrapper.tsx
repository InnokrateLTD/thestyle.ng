const CardWrapper = ({title, amount, unit}: {title: string, amount?: number | string, unit?: number}) =>{
    return(
        <div className="flex p-4 flex-col border border-gray-200">
            <div>
            <p className="uppercase">{title}</p>
            <h3 className=" text-2xl font-medium mt-5">{amount ? `₦${amount}` : unit}</h3>
            </div>
        </div>
        
    )
}

export default CardWrapper