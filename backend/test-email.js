// Check delivery status for madiha emails
require('dotenv').config();

async function check() {
  const res = await fetch('https://api.brevo.com/v3/smtp/statistics/events?limit=5&sort=desc&email=madiha@systematics.com.pk', {
    headers: { 'api-key': process.env.BREVO_API_KEY, 'accept': 'application/json' },
  });
  const data = await res.json();
  
  console.log('All events for madiha@systematics.com.pk:\n');
  data.events.forEach((e, i) => {
    console.log(`${i+1}. [${e.event.toUpperCase()}]`);
    console.log(`   Subject: ${e.subject}`);
    console.log(`   From: ${e.from}`);
    if (e.reason) console.log(`   REASON: ${e.reason}`);
    console.log(`   Time: ${e.date}\n`);
  });
}

check();
