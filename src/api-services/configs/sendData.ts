import { AxiosResponse } from 'axios';
import { axiosInstance } from './fetcher';

type requestConfigType = {
  url: string;
  data: object;
};
const postData = async <
  ResponseType extends AxiosResponse,
  U extends requestConfigType['url'],
  D extends requestConfigType['data']
>(
  url: U,
  data?: D,
  service?: 'style-ng' | 'admin'
): Promise<ResponseType> => {
  const result = await axiosInstance(service)
    .post(url, data)
    .then((res) => res)
    .catch((err) => err.response);
  return result;
};

// put data
const putData = async <
  ResponseType extends AxiosResponse,
  U extends requestConfigType['url'],
  D extends requestConfigType['data']
>(
  url: U,
  data?: D,
  service?: 'style-ng' | 'admin'
): Promise<ResponseType> => {
  const result = await axiosInstance(service)
    .put(url, data)
    .then((res) => res)
    .catch((err) => err.response);

  return result;
};

// Patch data
const patchData = async <
  ResponseType extends AxiosResponse,
  U extends requestConfigType['url'],
  D extends requestConfigType['data']
>(
  url: U,
  data?: D,
  service?: 'style-ng' | 'admin'
): Promise<ResponseType> => {
  const result = await axiosInstance(service)
    .patch(url, data)
    .then((res) => res)
    .catch((err) => err.response);

  return result;
};

const deleteData = async <
  ResponseType extends AxiosResponse,
  U extends requestConfigType['url']
>(
  url: U,
  service?: 'style-ng' | 'admin'
): Promise<ResponseType> => {
  const result = await axiosInstance(service)
    .delete(url)
    .then((res) => res)
    .catch((err) => err.response);

  return result;
};

const postMultipartData = async <
  ResponseType extends AxiosResponse,
  U extends requestConfigType['url'],
  D extends requestConfigType['data']
>(
  url: U,
  data?: D,
  service?: 'style-ng' | 'admin'
): Promise<ResponseType> => {
  const result = await axiosInstance(service)
    .post(url, data, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    })
    .then((res) => res)
    .catch((err) => err.response);
  return result;
};

export const mutationRequest = <
  U extends requestConfigType['url'],
  D extends requestConfigType['data'],
  T extends 'post' | 'put' | 'delete' | 'patch' | 'data'
>(
  url: U,
  type: T,
  data?: D,
  service?: 'style-ng' | 'admin'
) => {
  switch (type) {
    case 'post':
      return postData(url, data, service);
    case 'put':
      return putData(url, data, service);

    case 'patch':
      return patchData(url, data, service);

    case 'delete':
      return deleteData(url, service);

    case 'data':
      return postMultipartData(url, data, service);

    default:
      return postData(url, data, service);
  }
};