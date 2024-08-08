import { Select } from 'antd';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function OrganizationDropDown() {
  return (
    <Select
      defaultValue="총학생회"
      style={{ width: 200 }}
      onChange={handleChange}
      options={[
        {
          label: <span>총학생회</span>,
          title: '총학생회',
          options: [{ label: <span>총학생회</span>, value: '총학생회' }],
        },
        {
          label: <span>단과대학</span>,
          title: '단과대학',
          options: [
            { label: <span>ICT융합대학</span>, value: 'ICT융합대학' },
            { label: <span>경영대학</span>, value: '경영대학' },
          ],
        },
        {
          label: <span>학과</span>,
          title: '학과',
          options: [
            { label: <span>융합소프트웨어학부</span>, value: '융합소프트웨어학부' },
            { label: <span>법학과</span>, value: '법학과' },
          ],
        },
      ]}
    />
  );
}

export default OrganizationDropDown;
