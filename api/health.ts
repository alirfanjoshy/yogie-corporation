type VercelResponse = {
  json: (body: unknown) => void;
};

export default function handler(_req: unknown, res: VercelResponse) {
  res.json({ ok: true, service: "yogie-corporation-api" });
}
