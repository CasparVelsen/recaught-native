import Button from './Button';

export default {
  title: 'components/Button',
  component: Button,
};

const Template = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Click me',
};

export const Accent = Template.bind({});
Accent.args = {
  text: 'Click me',
  isAccent: true,
};
