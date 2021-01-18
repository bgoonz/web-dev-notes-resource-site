import React, {useState} from 'react';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

const CmdControlClick = ({onCmdControlClick, onClick}) => (
  <button
    type="button"
    onClick={(event) => {
      if (event.ctrlKey || event.metaKey) return onCmdControlClick(event);
      onClick(event);
    }}
  >
    Click me
  </button>
);

CmdControlClick.propTypes = {
  onCmdControlClick: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

const App = () => {
  const [clickType, setClickType] = useState('none');
  return (
    <>
      {clickType}
      <br />
      <CmdControlClick
        onCmdControlClick={() => setClickType('cmd-control-click')}
        onClick={() => setClickType('click')}
      />
      <button type="button" onClick={() => setClickType('none')}>
        Reset
      </button>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
