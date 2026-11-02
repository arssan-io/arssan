#!/usr/bin/env node
/**
 * DNS for AI Discovery (DNS-AID) Publisher & Verifier for Arssan Studio
 * Specifications:
 *   - draft-mozleywilliams-dnsop-dnsaid-02
 *   - RFC 9460 (SVCB / HTTPS)
 *   - isitagentready.com
 */

const DOMAIN = process.env.DNS_AID_DOMAIN || "arssan.com";
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;
const ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;

const RECORDS_TO_PUBLISH = [
  {
    type: "HTTPS",
    name: `_index._agents.${DOMAIN}`,
    data: {
      priority: 1,
      target: DOMAIN,
      value: "alpn=h2,h3 port=443",
    },
    ttl: 3600,
    comment: "DNS-AID Organizational Index",
  },
  {
    type: "HTTPS",
    name: `_a2a._agents.${DOMAIN}`,
    data: {
      priority: 1,
      target: DOMAIN,
      value: "alpn=a2a port=443",
    },
    ttl: 3600,
    comment: "DNS-AID A2A Protocol Entrypoint",
  },
  {
    type: "HTTPS",
    name: `_mcp._agents.${DOMAIN}`,
    data: {
      priority: 1,
      target: DOMAIN,
      value: "alpn=mcp port=443",
    },
    ttl: 3600,
    comment: "DNS-AID MCP Protocol Entrypoint",
  },
  {
    type: "TXT",
    name: `_index._agents.${DOMAIN}`,
    content: `v=DNS-AID1; uri=https://${DOMAIN}/.well-known/ai-catalog.json`,
    ttl: 3600,
    comment: "DNS-AID Fallback TXT Catalog Index",
  },
];

async function checkDoH(name, type) {
  const url = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}&do=1`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/dns-json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    return await res.json();
  } catch (err) {
    // Fallback to Google DoH
    try {
      const gUrl = `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}&do=1`;
      const gRes = await fetch(gUrl, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(5000),
      });
      return await gRes.json();
    } catch {
      return { error: err.message };
    }
  }
}

async function verifyDnsAid() {
  console.log(`\n======================================================`);
  console.log(`Verifying DNS-AID records for ${DOMAIN} via DNS-over-HTTPS...`);
  console.log(`======================================================\n`);

  const checks = [
    { name: `_index._agents.${DOMAIN}`, type: "HTTPS" },
    { name: `_index._agents.${DOMAIN}`, type: "SVCB" },
    { name: `_a2a._agents.${DOMAIN}`, type: "HTTPS" },
    { name: `_mcp._agents.${DOMAIN}`, type: "HTTPS" },
    { name: `_index._agents.${DOMAIN}`, type: "TXT" },
  ];

  let anyFound = false;

  for (const check of checks) {
    const res = await checkDoH(check.name, check.type);
    if (res.Answer && res.Answer.length > 0) {
      anyFound = true;
      console.log(`[PASS] ${check.type} ${check.name}:`);
      for (const ans of res.Answer) {
        console.log(`       -> ${ans.data} (TTL: ${ans.TTL})`);
      }
      console.log(`       DNSSEC Validated (AD flag): ${res.AD ? "YES (AD=true)" : "NO"}`);
    } else {
      console.log(`[MISSING] ${check.type} ${check.name} (Status: ${res.Status ?? "unknown"})`);
    }
  }

  console.log(`\n--- Running isitagentready.com validation scan ---`);
  try {
    const scanRes = await fetch("https://isitagentready.com/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: `https://${DOMAIN}` }),
      signal: AbortSignal.timeout(20000),
    });
    if (scanRes.ok) {
      const scanData = await scanRes.json();
      const dnsAid = scanData.checks?.discoverability?.dnsAid;
      console.log(`Status:  ${dnsAid?.status?.toUpperCase()}`);
      console.log(`Message: ${dnsAid?.message}`);
      if (dnsAid?.details?.records?.length > 0) {
        console.log(`Records discovered:`, dnsAid.details.records);
      }
    } else {
      console.log(`Scanner returned HTTP ${scanRes.status}`);
    }
  } catch (err) {
    console.log(`Could not reach isitagentready.com scanner: ${err.message}`);
  }

  return anyFound;
}

async function publishToCloudflare() {
  if (!CF_API_TOKEN) {
    console.error(`\n[ERROR] CLOUDFLARE_API_TOKEN environment variable is not set.`);
    console.log(`To publish automatically via Cloudflare API:`);
    console.log(`  $env:CLOUDFLARE_API_TOKEN="your_token_here"`);
    console.log(`  node scripts/publish-dns-aid.mjs --publish\n`);
    console.log(`Alternatively, import dns/arssan.com-dns-aid.zone or add records in Cloudflare dashboard.`);
    return;
  }

  console.log(`Fetching Cloudflare Zone ID for domain "${DOMAIN}"...`);
  let zoneId = ZONE_ID;

  if (!zoneId) {
    const zoneRes = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${DOMAIN}`, {
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const zoneData = await zoneRes.json();
    if (!zoneData.success || !zoneData.result?.length) {
      console.error(`Failed to find zone for ${DOMAIN}:`, zoneData.errors);
      return;
    }
    zoneId = zoneData.result[0].id;
  }

  console.log(`Found Zone ID: ${zoneId}`);

  // Fetch existing DNS records in zone
  const existingRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?per_page=100`, {
    headers: {
      Authorization: `Bearer ${CF_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const existingData = await existingRes.json();
  const existingRecords = existingData.result || [];

  for (const record of RECORDS_TO_PUBLISH) {
    const existing = existingRecords.find(
      (r) => r.type === record.type && r.name.toLowerCase() === record.name.toLowerCase()
    );

    if (existing) {
      console.log(`Updating existing record: ${record.type} ${record.name} (${existing.id})...`);
      const updateRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${existing.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
      const updateData = await updateRes.json();
      if (updateData.success) {
        console.log(`[UPDATED] ${record.type} ${record.name}`);
      } else {
        console.error(`[ERROR] Failed to update ${record.name}:`, updateData.errors);
      }
    } else {
      console.log(`Creating record: ${record.type} ${record.name}...`);
      const createRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
      const createData = await createRes.json();
      if (createData.success) {
        console.log(`[CREATED] ${record.type} ${record.name}`);
      } else {
        console.error(`[ERROR] Failed to create ${record.name}:`, createData.errors);
      }
    }
  }

  console.log(`\nVerifying published records...`);
  await verifyDnsAid();
}

const args = process.argv.slice(2);
if (args.includes("--publish")) {
  publishToCloudflare();
} else {
  verifyDnsAid();
}
