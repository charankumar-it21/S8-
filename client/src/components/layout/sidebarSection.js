import PropTypes from 'prop-types';

export function SidebarSection({ title }) {
  return (
    <div className="px-4 py-2">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );
}

SidebarSection.propTypes = {
  title: PropTypes.string.isRequired
};