import ListCollapse from '@/components/collapse';
import { ListCollapseProps } from '@/components/collapse/types';

function Faq() {
  const data: ListCollapseProps['items'] = [
    {
      key: '1',
      label: 'Panel Header 1',
      children: (
        <div>
          <p>Content for panel 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Panel Header 2',
      children: (
        <div>
          <p>Content for panel 2. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.</p>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Panel Header 3',
      children: (
        <div>
          <p>Content for panel 3. Nulla facilisi. Aenean nec eros.</p>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Panel Header 4',
      children: (
        <div>
          <p>
            Content for panel 4. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-5 pt-10">
      <h1 className="mb-5 text-2xl font-bold">FAQ 목록</h1>
      <ListCollapse items={data} />
    </div>
  );
}

export default Faq;
