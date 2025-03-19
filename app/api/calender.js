import { google } from "googleapis";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: "v3", auth });

  if (req.method === "GET") {
    // Takvim Etkinliklerini Getir
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    return res.status(200).json(response.data.items);
  }

  if (req.method === "POST") {
    // Yeni Etkinlik Ekle
    const event = {
      summary: req.body.summary,
      location: req.body.location || "",
      description: req.body.description || "",
      start: { dateTime: req.body.start },
      end: { dateTime: req.body.end },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    return res.status(201).json(response.data);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
