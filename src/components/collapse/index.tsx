import { Collapse } from 'antd';

import { ListCollapseProps } from './types';

function ListCollapse({ items }: ListCollapseProps) {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse items={items} onChange={onChange} />;
}

export default ListCollapse;
