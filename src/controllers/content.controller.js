import Content from '../models/Content.js';
import { buildPayload } from '../utils/requestPayload.js';

export async function getContentList(req, res, next) {
  try {
    const query = { type: req.params.type.toLowerCase() };
    if (req.query.status) {
      query.status = req.query.status;
    }

    const items = await Content.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
}

export async function getContentById(req, res, next) {
  try {
    const item = await Content.findOne({ _id: req.params.id, type: req.params.type.toLowerCase() });
    if (!item) {
      res.status(404);
      throw new Error('Content not found');
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function createContent(req, res, next) {
  try {
    const payload = buildPayload(req);
    const item = await Content.create({
      ...payload,
      type: req.params.type.toLowerCase()
    });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function updateContent(req, res, next) {
  try {
    const payload = buildPayload(req);
    const item = await Content.findOneAndUpdate(
      { _id: req.params.id, type: req.params.type.toLowerCase() },
      payload,
      { new: true, runValidators: true }
    );

    if (!item) {
      res.status(404);
      throw new Error('Content not found');
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function deleteContent(req, res, next) {
  try {
    const item = await Content.findOneAndDelete({ _id: req.params.id, type: req.params.type.toLowerCase() });
    if (!item) {
      res.status(404);
      throw new Error('Content not found');
    }
    res.json({ success: true, message: 'Content deleted successfully' });
  } catch (error) {
    next(error);
  }
}
