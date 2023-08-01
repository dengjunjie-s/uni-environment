'use strict';

exports.main = async (event, context) => {
  try {
    const res = await uniCloud.httpclient.request(event.url, {
      method: event.method.toUpperCase(),
      headers: event.header,
      data: event.data,
      contentType: 'json',
      dataType: 'json'
    });
    return {
      statusCode: 200,
      data: res.data
    };
  } catch (err) {
    return {
      statusCode: 500,
      data: {},
      event
    };
  }
};
