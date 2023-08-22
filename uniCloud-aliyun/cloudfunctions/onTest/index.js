'use strict';

exports.main = async (event, context) => {
  try {
    const res = await uniCloud.httpclient.request(event.url, {
      method: event.method.toUpperCase(),
      headers: event.header,
      data: event.data,
      contentType: 'json',
      dataType: 'json',
      timeout: 600000
    });
    return {
      statusCode: 200,
      data: res.data
    };
  } catch (err) {
    return {
      statusCode: 500,
      data: JSON.stringify(err) || err,
      event
    };
  }
};
