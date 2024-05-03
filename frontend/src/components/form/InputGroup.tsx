import React from 'react';

const InputGroup: React.FC<{ classes?: string; children: any }> = (props) => (
  <div
    className={`flex flex-col space-y-15 gap-20 ${props.classes}`}
    style={{ transition: 'all .5s linear' }}>
    {props.children}
  </div>
);
export default React.memo(InputGroup);
