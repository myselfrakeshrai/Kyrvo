export const generateResponse = (
  res: any,
  data: any,
  failureCode: number,
  failureMessage: string,
  successCode: number = 200,
) => {
  if (!data) {
    return res.json({ error: failureMessage, ok: false }, failureCode);
  }
  return res.json({ data: data, ok: true }, successCode);
};
