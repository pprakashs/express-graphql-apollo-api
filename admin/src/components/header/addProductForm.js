import React, { useState, useEffect, useCallback, useRef } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useDropzone } from 'react-dropzone';

import { Form, Input, InputNumber, Select, Button, Skeleton } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import GetCategory from './../../helpers/getCategory';

const { Option } = Select;

const ADD_PRODUCT = gql`
  mutation($title: String!, $description: String, $price: Int, $image: Upload!) {
    addProduct(input: { title: $title, description: $description, price: $price, image: $image }) {
      id
      title
      image
    }
  }
`;

const AddProductForm = ({ cancel }) => {
  const [files, setFiles] = useState([]);
  const [loader, setLoader] = useState(false);
  const formRef = useRef();

  const [mutate, { loading, error, data }] = useMutation(ADD_PRODUCT);

  const { catLoading, category } = GetCategory();

  // useEffect(() => {
  //   //files.forEach((file) => URL.revokeObjectURL(file.preview));
  // }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const submitHandle = async (inputData) => {
    console.log(inputData);
    try {
      inputData.image = files[0];
      await mutate({ variables: inputData });

      // CLEAR FIELD
      formRef.current.resetFields();
      setFiles([]);
    } catch (err) {}
  };

  const previewThumb = files.map((file) => (
    <div key={file.name}>
      <img src={file.preview} alt="" />
    </div>
  ));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    multiple: false,
  });

  return (
    <Form onFinish={submitHandle} ref={formRef} layout="vertical" size="large">
      <Form.Item>
        <div className="image-uploader" {...getRootProps()}>
          <input {...getInputProps()} />
          <InboxOutlined size="large" />
          {isDragActive ? (
            <p className="ant-upload-text">Drop the files here ...</p>
          ) : (
            <p className="ant-upload-text">
              <span>Drag/Upload</span> your image here.
            </p>
          )}
        </div>

        <div className="upload-preview-img">{previewThumb}</div>
      </Form.Item>

      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Title is required field!' }]}>
        <Input name="title" />
      </Form.Item>

      <Form.Item label="Description" name="description" size="large">
        <Input.TextArea name="description" />
      </Form.Item>

      <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Price is required field!' }]}>
        <InputNumber type="number" style={{ width: '100%' }} name="price" />
      </Form.Item>

      <Form.Item label="Category" name="category">
        {!catLoading ? (
          <Select placeholder="Product Category" allowClear mode="multiple">
            {category.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        ) : (
          <Skeleton.Input style={{ width: '100%' }} active={true} />
        )}
      </Form.Item>

      <footer className="ant-drawer-footer">
        <Button block={true} type="link" danger onClick={cancel}>
          Cancel
        </Button>
        <Button block={true} type="primary" htmlType="submit" className="button" size="large" loading={loading}>
          Create Product
        </Button>
      </footer>
    </Form>
  );
};

export default AddProductForm;
