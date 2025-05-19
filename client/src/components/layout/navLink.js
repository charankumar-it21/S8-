import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export function NavLink({ route, icon: Icon, name }) {
  return (
    <Link
      to={route} // Use `to` instead of `href`
      className="flex items-center px-4 py-2 text-white hover:bg-[#708194] rounded-lg transition-colors"
    >
      <Icon className="mr-3" size={20} />
      <span>{name}</span>
    </Link>
  );
}

NavLink.propTypes = {
  route: PropTypes.string.isRequired, // Change `href` to `to`
  icon: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired
};
