import { config } from 'dotenv';
config({ path: '.env.local' });

import { generatePersonalizedMissions } from '@/ai/flows/generate-personalized-missions';

async function main() {
  const out = await generatePersonalizedMissions({ crop: 'corn', location: 'Kansas', farmSize: 'medium' });
  console.log(JSON.stringify(out));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

