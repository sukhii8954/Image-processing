import Request from '../proModels/reqModel.js';

export const checkStatus = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await Request.findOne({ requestId });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json({ status: request.status, images: request.images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving status' });
  }
};
