import PropTypes from 'prop-types';
function Child(props) {
  const array = props.array;
  return (
    <ul className="flex flex-wrap w-full gap-4">
      {array.map((item) => (
        <li
          className="block text-left text-gray-300  border-r-[2px] border-gray-100 px-[2rem] w-[11rem] 
          "
          key={item.id}
        >
          <img src={item.image} alt={item.firstName} />
          {item.id} {item.firstName}
          {item.age}
        </li>
      ))}
    </ul>
  );
}
Child.propTypes = {
  array: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.number.isRequired,
  }),
};

export default Child;
