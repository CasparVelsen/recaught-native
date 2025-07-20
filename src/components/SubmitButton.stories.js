import SubmitButton from './SubmitButton';

export default {
  title: 'components/SubmitButton',
  component: SubmitButton,
};

const Template = args => <SubmitButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Submit',
};

export const Accent = Template.bind({});
Accent.args = {
  text: 'Submit',
  isAccent: true,
};
