function Metric({ label, value, color }) {
  const colors = {
    green: {classContent:"p-3 rounded-lg min-w-max w-full bg-linear-to-r from-black to-black/10 ",classTitle:"text-md font-medium  text-white ",classCantidad:"text-xl font-bold  text-white "},
    blue: {classContent:"p-3 rounded-lg  min-w-max w-full bg-linear-to-r from-black to-black/10 ",classTitle:"text-md font-medium  text-white ",classCantidad:value <= 0 ? "text-xl  font-bold  text-red-900" : " text-xl  font-bold  text-white"},
    purple:{classContent:"p-3 rounded-lg  min-w-max w-full bg-linear-to-r from-black to-black/10 ",classTitle:"text-md font-medium  text-white ",classCantidad:"text-xl  font-bold  text-white"},
    slate:{classContent:"p-3 rounded-lg  min-w-max w-full bg-linear-to-r from-black to-black/10",classTitle:"text-md font-medium  text-white",classCantidad:"text-[17px]  font-bold  text-white "},
  };

  return (
    <div className={`p-3 rounded-lg border ${colors[color].classContent}`}>
      <span className={colors[color].classTitle}>{label}</span>
      <p className={colors[color].classCantidad}>{value} <span className="!text-sm !text-gray-400/70">
        {label==='Stock' ? ' unidades' : label==='Valor Total' ||  label==='Precio' ? 'US' : ''}</span>
      </p>
    </div>
  );
}
export default Metric