import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';

export default function FormLayoutDemo ()  {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onRequiredTypeChange = ({ requiredMark }) => {
    setRequiredMarkType(requiredMark);
  };

  const handleOk = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        for (let key in values) {
          if (!values[key]) {
            delete values[key]
          }
        }

        if (values.birthYear) {
          values.birthYear = Number(values.birthYear)
        }
        if (values.deathYear) {
          values.deathYear = Number(values.deathYear)
        }

        setSubmitting(true)
        try {
          const result = (await api.post('/maker', values)).data
          addMaker(result)
          setSubmitting(false)
          handleCancel()
          resetFields()
          message.success('Created new maker succesfully!', 2)
        } catch (e) {
          setSubmitting(false)
          message.error(e.response.data.message)
        }
      }
    })
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Form.Item label="Field A" required>
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};