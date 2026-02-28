const LARK_MAIL_URL =
  "https://open.larksuite.com/open-apis/mail/v1/user_mailboxes/contact@mindfrix.com/messages/send";

const BEARER_TOKEN = "u-fls9amXmBe.qpa8w5kkczwUl0W1D0hMVNEy0ew72yc8C";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendLarkMail({ to, subject, html }: SendMailOptions) {
  const res = await fetch(LARK_MAIL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify({
      subject,
      body_html: html,
      head_from: { name: "MindFrix" },
      to: [{ mail_address: to }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Lark mail failed (${res.status}): ${body}`);
  }

  return res.json();
}
