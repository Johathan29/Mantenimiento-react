function Metric({ label, value, color }) {
  const colors = {
    green: {classContent:"bg-green-50  border-green-200 ",classTitle:"text-md font-medium  text-green-600 ",classCantidad:"text-xl font-bold  text-green-900 "},
    blue: {classContent:"bg-blue-50  border-blue-200 ",classTitle:"text-md font-medium  text-blue-600 ",classCantidad:value <= 0 ? "text-xl  font-bold  text-red-900" : " text-xl  font-bold  text-blue-900 "},
    purple:{classContent:"bg-purple-50  border-purple-200 ",classTitle:"text-md font-medium  text-purple-600 ",classCantidad:"text-xl  font-bold  text-purple-900 "},
    slate:{classContent:"bg-slate-50  border-slate-200 ",classTitle:"text-md font-medium  text-slate-600 ",classCantidad:"text-[17px]  font-bold  text-slate-900 "},
  };

  return (
    <div className={`p-3 rounded-lg border ${colors[color].classContent}`}>
      <span className={colors[color].classTitle}>{label}</span>
      <p className={colors[color].classCantidad}>{value}{label==='Stock' ? ' unidades' : ''}</p>
    </div>
  );
}
export default Metric