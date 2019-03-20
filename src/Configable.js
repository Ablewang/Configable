import React, { Component } from 'react'
import { Form, Input, Select, Radio, Checkbox, DatePicker } from 'antd'

import {
    Button
} from 'antd';


class Configable extends Component {
    __getItem = (config) => {
        switch (config.type) {
            case 'input': return <Input value={config.id} />
            case 'select': return <Select />
            case 'radio': return <Radio>{config.id}</Radio>
            case 'checkbox': return <Checkbox >{config.id}</Checkbox >
            case 'datePicker': return <DatePicker />
            default:
                return <Input />
        }
    }
    render() {
        const list = getConfig()
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        }
        return (
            <Form layout={{
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            }}
            >
                {list.map((item, i) => {
                    return (item.unrender ? null :
                        <Form.Item
                            {...formItemLayout}
                            label={item.label}
                            key={i}
                        >
                            {
                                this.__getItem(item)
                            }
                        </Form.Item>)
                })}
            </Form>
        )
    }
}

const getConfig = () => {
    const list = new Array()
    const type = ['input', 'select', 'radio', 'checkbox', 'datePicker']
    const tConfig = {
        1:['input'],
        3:['select'],
        5:['radio'],
        7:['checkbox'],
        9:['datePicker']
    }
    for (let i = 0; i < 10; i++) {
        const temp = tConfig[i] || tConfig[i + 1]
        console.log(temp)
        const cs = type.map(itm => {
            return {
                unrender: temp.findIndex(t=> t===itm) > -1,
                label: itm + i,
                type: itm,
                id: itm + i
            }
        })
        list.push(...cs)
    }
    return list
}
export default Configable