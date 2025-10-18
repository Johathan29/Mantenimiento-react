import { Resend } from "resend";

const resend = new Resend('re_ikaTwUyt_JaU5bGWasQD4vV4V8Nh7b75f');

export default async function handler(req, res) {
  try {
    const { to, subject, html } = req.body;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}
