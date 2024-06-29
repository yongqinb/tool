import React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';
const colors1 = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());
const App = ({ title, color, onClick, className,style ,disabled,loading}) => (
    <Space className={className} style={style}>
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: `linear-gradient(135deg, ${color ? color.join(', ') : colors1.join(', ')})`,
                        colorPrimaryHover: `linear-gradient(135deg, ${color ? getHoverColors(color).join(', ') : getHoverColors(colors1).join(', ')})`,
                        colorPrimaryActive: `linear-gradient(135deg, ${color ? getActiveColors(color).join(', ') : getActiveColors(colors1).join(', ')})`,
                        lineWidth: 0,
                    },
                },
            }}
        >
            <Button
                block
                type="primary"
                size='large'
                loading={loading}
                disabled={disabled}
                onClick={onClick}
            >
                {title}
            </Button>
        </ConfigProvider>
    </Space>
);
export default App;