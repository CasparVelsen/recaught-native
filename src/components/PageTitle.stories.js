import PageTitle from './PageTitle';

export default {
  title: 'components/PageTitle',
  component: PageTitle,
};

const Template = args => <PageTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'PageTitle',
};
