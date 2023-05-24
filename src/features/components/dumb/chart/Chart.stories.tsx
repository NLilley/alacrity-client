import type { Meta, StoryObj } from '@storybook/react';

import Chart from './Chart';
import { LWCCandle, ChartUtil } from '../../../../utils/chartUtil';
import { Candle } from '../../../../app/models/candle';

const meta = {
  title: 'Trade/Chart',
  component: Chart,
  tags: ['trading', 'autodocs'],
  argTypes: {},
  decorators: [
    Story => <div style={{ padding: 120 }}><Story /></div>
  ]
} satisfies Meta<typeof Chart>

export default meta;
type Story = StoryObj<typeof meta>;


const GetRandomCandle = (offset: number): Candle => {
  let nums = [Math.random(), Math.random(), Math.random(), Math.random()];  
  return {
    date: ((Date.now() / 1000) + offset) as any,
    open: nums[1],
    high: nums[3],
    low: nums[0],
    close: nums[2],
  }
};
const basicStorySetup = (ele: any) => {
  ChartUtil.setupCandlesticks(
    ele,
    [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => GetRandomCandle(i))
  );
}
export const BasicChart: Story = {
  args: {
    onStart: basicStorySetup,
    onEnd: () => console.log("Ended!")
  }
}
