import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for submitting marks
  app.post("/api/submit-marks", async (req, res) => {
    const { 
      userName, 
      score, 
      totalQuestions, 
      percentage, 
      selectedUnit, 
      selectedLevel, 
      selectedSubLevel, 
      selectedSubject,
      userAnswers,
      currentQuestions 
    } = req.body;

    console.log(`Submission received from ${userName}: ${score}/${totalQuestions} (${percentage}%)`);

    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    if (smtpConfig.auth.user && smtpConfig.auth.pass) {
      try {
        const transporter = nodemailer.createTransport(smtpConfig);
        
        // Build question report
        const questionReportHtml = currentQuestions.map((q: any, idx: number) => {
          const answer = userAnswers.find((a: any) => a.questionId === q.id);
          const isCorrect = answer?.isCorrect;
          return `
            <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 8px; background-color: ${isCorrect ? '#f0fff4' : '#fff5f5'}">
              <p style="margin: 0 0 5px; font-size: 12px; color: #666; text-transform: uppercase; font-weight: bold">Question ${idx + 1} • ${q.unit}</p>
              <p style="margin: 0 0 10px; font-weight: bold; font-size: 16px">${q.question}</p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px">
                <div>
                  <p style="margin: 0; font-size: 11px; color: #888; text-transform: uppercase">User's Answer</p>
                  <p style="margin: 0; font-weight: bold; color: ${isCorrect ? '#059669' : '#dc2626'}">${answer?.selectedOption || 'No Answer (Timed Out)'}</p>
                </div>
                ${!isCorrect ? `
                <div>
                  <p style="margin: 0; font-size: 11px; color: #888; text-transform: uppercase">Correct Answer</p>
                  <p style="margin: 0; font-weight: bold; color: #059669">${q.correctAnswer}</p>
                </div>` : ''}
              </div>
            </div>
          `;
        }).join('');

        const certificateHtml = `
          <div style="margin-top: 40px; padding: 40px; border: 10px solid #059669; border-radius: 10px; text-align: center; background-color: #fff">
            <h1 style="color: #059669; margin-bottom: 10px">CERTIFICATE OF ACHIEVEMENT</h1>
            <p style="font-size: 18px; margin-bottom: 30px">This is to certify that</p>
            <h2 style="font-size: 32px; border-bottom: 2px solid #eee; display: inline-block; padding: 0 40px 10px; margin-bottom: 30px">${userName}</h2>
            <p style="font-size: 18px; margin-bottom: 10px">has successfully completed the revision quiz for</p>
            <h3 style="font-size: 24px; color: #333; margin-bottom: 30px">${selectedSubject} - ${selectedUnit}</h3>
            <div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 40px">
              <div style="text-align: center">
                <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 0">${percentage}%</p>
                <p style="font-size: 12px; color: #666; margin: 0">SCORE</p>
              </div>
              <div style="text-align: center">
                <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 0">${score}/${totalQuestions}</p>
                <p style="font-size: 12px; color: #666; margin: 0">CORRECT</p>
              </div>
            </div>
            <p style="font-size: 14px; color: #888">Date: ${new Date().toLocaleDateString()}</p>
            <p style="font-size: 12px; color: #aaa; margin-top: 20px">Instructor: Niyomwungeri Patrick</p>
          </div>
        `;

        await transporter.sendMail({
          from: `"Revision Quiz System" <${process.env.SMTP_USER}>`,
          to: "niyomwungeripatrick83@gmail.com",
          subject: `Quiz Result: ${userName} - ${percentage}%`,
          html: `
            <div style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333">
              <h2 style="color: #059669; border-bottom: 2px solid #eee; padding-bottom: 10px">Quiz Result Summary</h2>
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 12px; margin-bottom: 30px">
                <p><strong>User:</strong> ${userName}</p>
                <p><strong>Level:</strong> ${selectedLevel} ${selectedSubLevel || ''}</p>
                <p><strong>Subject:</strong> ${selectedSubject}</p>
                <p><strong>Unit:</strong> ${selectedUnit}</p>
                <p><strong>Score:</strong> ${score} / ${totalQuestions} (${percentage}%)</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <h2 style="color: #059669; border-bottom: 2px solid #eee; padding-bottom: 10px">Detailed Question Report</h2>
              ${questionReportHtml}

              <h2 style="color: #059669; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 40px">Certificate View</h2>
              ${certificateHtml}

              <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #888; font-size: 12px">
                <p>This email was automatically generated by the Revision Quiz System.</p>
              </div>
            </div>
          `,
        });
        console.log("Email sent successfully");
        res.json({ success: true, message: "Marks submitted and email sent." });
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email, but marks were logged." });
      }
    } else {
      console.log("SMTP credentials not provided. Marks logged only.");
      res.json({ success: true, message: "Marks submitted (logged on server). Provide SMTP credentials for email delivery." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
