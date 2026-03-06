type ContactEmailDetails = {
  nameRole: string;
  company: string;
  phone: string;
  email: string;
  usersPcs: string;
  hasServer: string;
  issues: string[];
  message: string;
  submittedAt?: string;
};

type ContactEmailInput = {
  language: string;
  siteName: string;
  details: ContactEmailDetails;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(value: string | undefined, language: string) {
  if (!value) return language === "es" ? "No disponible" : "Not available";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleString(language === "es" ? "es-PR" : "en-US");
}

function labelSet(language: string) {
  if (language === "es") {
    return {
      subject: "Confirmacion de solicitud",
      hello: "Hola",
      intro:
        "Recibimos tu solicitud correctamente. Este es un resumen de la informacion enviada:",
      submittedAt: "Fecha de envio",
      nameRole: "Nombre / Cargo",
      company: "Empresa",
      phone: "Telefono",
      email: "Correo",
      usersPcs: "Usuarios / PCs",
      hasServer: "Tiene servidor",
      issues: "Problemas seleccionados",
      message: "Mensaje",
      noValue: "No provisto",
      noIssues: "No se seleccionaron problemas",
      footer:
        "Nuestro equipo revisara estos detalles y te contactara pronto.",
    };
  }

  return {
    subject: "Request Confirmation",
    hello: "Hello",
    intro:
      "We received your request successfully. Here is a summary of the details you submitted:",
    submittedAt: "Submitted at",
    nameRole: "Name / Role",
    company: "Company",
    phone: "Phone",
    email: "Email",
    usersPcs: "Users / PCs",
    hasServer: "Has server",
    issues: "Selected issues",
    message: "Message",
    noValue: "Not provided",
    noIssues: "No issues selected",
    footer:
      "Our team will review these details and contact you shortly.",
  };
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;width:180px;font-weight:600;color:#0f172a;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#334155;">${escapeHtml(value)}</td>
    </tr>
  `;
}

export function buildContactConfirmationEmail(input: ContactEmailInput) {
  const labels = labelSet(input.language);
  const { details } = input;
  const siteName = input.siteName.trim() || "Earthy Raw Technologies";
  const safeName = details.nameRole.trim() || labels.noValue;
  const submittedAt = formatDate(details.submittedAt, input.language);
  const issuesText = details.issues.length ? details.issues.join(", ") : labels.noIssues;
  const messageText = details.message.trim() || labels.noValue;

  const subject = `${labels.subject} - ${siteName}`;

  const text = [
    `${labels.hello} ${safeName},`,
    "",
    labels.intro,
    "",
    `${labels.submittedAt}: ${submittedAt}`,
    `${labels.nameRole}: ${details.nameRole || labels.noValue}`,
    `${labels.company}: ${details.company || labels.noValue}`,
    `${labels.phone}: ${details.phone || labels.noValue}`,
    `${labels.email}: ${details.email || labels.noValue}`,
    `${labels.usersPcs}: ${details.usersPcs || labels.noValue}`,
    `${labels.hasServer}: ${details.hasServer || labels.noValue}`,
    `${labels.issues}: ${issuesText}`,
    `${labels.message}: ${messageText}`,
    "",
    labels.footer,
    `- ${siteName}`,
  ].join("\n");

  const html = `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:Segoe UI,Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;background:#f1f5f9;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#0e7490,#0f172a);padding:24px 26px;">
                <h1 style="margin:0;font-size:20px;line-height:1.3;color:#f8fafc;">${escapeHtml(subject)}</h1>
                <p style="margin:8px 0 0 0;font-size:13px;color:#bae6fd;">${escapeHtml(siteName)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 26px 10px 26px;">
                <p style="margin:0 0 10px 0;font-size:15px;color:#0f172a;">${escapeHtml(labels.hello)} ${escapeHtml(safeName)},</p>
                <p style="margin:0 0 16px 0;font-size:14px;line-height:1.6;color:#334155;">${escapeHtml(labels.intro)}</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#f8fafc;">
                  ${detailRow(labels.submittedAt, submittedAt)}
                  ${detailRow(labels.nameRole, details.nameRole || labels.noValue)}
                  ${detailRow(labels.company, details.company || labels.noValue)}
                  ${detailRow(labels.phone, details.phone || labels.noValue)}
                  ${detailRow(labels.email, details.email || labels.noValue)}
                  ${detailRow(labels.usersPcs, details.usersPcs || labels.noValue)}
                  ${detailRow(labels.hasServer, details.hasServer || labels.noValue)}
                  ${detailRow(labels.issues, issuesText)}
                  ${detailRow(labels.message, messageText)}
                </table>
                <p style="margin:16px 0 0 0;font-size:14px;line-height:1.6;color:#334155;">${escapeHtml(labels.footer)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 26px 24px 26px;">
                <p style="margin:0;font-size:12px;color:#64748b;">${escapeHtml(siteName)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  return { subject, text, html };
}
