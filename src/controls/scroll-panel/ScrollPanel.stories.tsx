import type { Meta, StoryObj } from '@storybook/react';

import ScrollPanel from './ScrollPanel';
import Ticker from '../../features/components/dumb/ticker/Ticker';

const meta = {
    title: 'Controls/ScrollPanel',
    component: ScrollPanel,
    tags: ['control', 'autodocs'],
} satisfies Meta<typeof ScrollPanel>

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyScrollPanel: Story = {
    args: {
        children: []
    }
}

export const SingletonTicker: Story = {
    args: {
        children: [
            <Ticker ticker="META"
                price={123.45}
                prevClose={120.88}
                icon={undefined} />
        ]
    }
}

export const ComfortableScrollPanel: Story = {
    args: {
        children: [
            <Ticker
                ticker={'META'}
                price={123.45}
                prevClose={120.88}
                icon={'/icons/companies/grey/meta.svg'}
            />,
            <Ticker
                ticker={'APPL'}
                price={1011}
                prevClose={1200}
                icon={'/icons/companies/grey/apple.svg'}
            />,
            <Ticker
                ticker={'V'}
                price={333.67}
                prevClose={0}
                icon={'/icons/companies/grey/visa.svg'}
            />
        ]
    }
}

export const OverflowingScrollPanel: Story = {
    args: {
        children: [
            <Ticker
                ticker={'META'}
                price={123.45}
                prevClose={120.88}
                icon={'/icons/companies/grey/meta.svg'}
            />,
            <Ticker
                ticker={'APPL'}
                price={1011}
                prevClose={1200}
                icon={'/icons/companies/grey/apple.svg'}
            />,
            <Ticker
                ticker={'V'}
                price={333.67}
                prevClose={0}
                icon={'/icons/companies/grey/visa.svg'}
            />,
            <Ticker
                ticker={'META'}
                price={123.45}
                prevClose={120.88}
                icon={'/icons/companies/grey/meta.svg'}
            />,
            <Ticker
                ticker={'APPL'}
                price={1011}
                prevClose={1200}
                icon={'/icons/companies/grey/apple.svg'}
            />,
            <Ticker
                ticker={'V'}
                price={333.67}
                prevClose={0}
                icon={'/icons/companies/grey/visa.svg'}
            />,
            <Ticker
                ticker={'META'}
                price={123.45}
                prevClose={120.88}
                icon={'/icons/companies/grey/meta.svg'}
            />,
            <Ticker
                ticker={'APPL'}
                price={1011}
                prevClose={1200}
                icon={'/icons/companies/grey/apple.svg'}
            />,
            <Ticker
                ticker={'V'}
                price={333.67}
                prevClose={0}
                icon={'/icons/companies/grey/visa.svg'}
            />
        ]
    }
}

export const OverflowingScrollPanelWithRotate: Story = {
    args: {
        rotateElements: true,
        children: [
            <Ticker
                ticker={'META'}
                price={123.45}
                prevClose={120.88}
                icon={'/icons/companies/grey/meta.svg'}
            />,
            <Ticker
                ticker={'APPL'}
                price={1011}
                prevClose={1200}
                icon={'/icons/companies/grey/apple.svg'}
            />,
            <Ticker
                ticker={'V'}
                price={333.67}
                prevClose={0}
                icon={'/icons/companies/grey/visa.svg'}
            />,
            <Ticker
                ticker={'META'}
                price={123.45}
                prevClose={120.88}
                icon={'/icons/companies/grey/meta.svg'}
            />,
            <Ticker
                ticker={'APPL'}
                price={1011}
                prevClose={1200}
                icon={'/icons/companies/grey/apple.svg'}
            />,
            <Ticker
                ticker={'V'}
                price={333.67}
                prevClose={0}
                icon={'/icons/companies/grey/visa.svg'}
            />,
            <Ticker
                ticker={'META'}
                price={123.45}
                prevClose={120.88}
                icon={'/icons/companies/grey/meta.svg'}
            />,
            <Ticker
                ticker={'APPL'}
                price={1011}
                prevClose={1200}
                icon={'/icons/companies/grey/apple.svg'}
            />,
            <Ticker
                ticker={'V'}
                price={333.67}
                prevClose={0}
                icon={'/icons/companies/grey/visa.svg'}
            />
        ]
    }
}