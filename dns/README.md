# DNS for AI Discovery (DNS-AID) — Arssan Studio

This directory contains the DNS for AI Discovery (DNS-AID) configuration files and instructions to publish agent discovery records under the `_agents.arssan.com` namespace.

## Standards & Specifications

- **IETF Internet-Draft:** [draft-mozleywilliams-dnsop-dnsaid-02](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/)
- **RFC 9460:** [Service Binding and Parameter Specification via the DNS (SVCB and HTTPS Resource Records)](https://www.rfc-editor.org/rfc/rfc9460)
- **Scanner Validation:** [isitagentready.com DNS-AID Skill](https://isitagentready.com/.well-known/agent-skills/dns-aid/SKILL.md)

---

## Records Overview

DNS-AID uses ServiceMode `HTTPS` (type 65) or `SVCB` (type 64) records with Application-Layer Protocol Negotiation (`alpn`) and port connection parameters under `_agents.arssan.com`:

| Hostname / Owner Name | Type | Priority | Target | Parameters / Value | Purpose |
|-----------------------|------|----------|--------|--------------------|---------|
| `_index._agents.arssan.com` | `HTTPS` | `1` | `arssan.com.` | `alpn="h2,h3" port=443` | Organization Agent Index |
| `_a2a._agents.arssan.com` | `HTTPS` | `1` | `arssan.com.` | `alpn="a2a" port=443` | Agent-to-Agent (A2A) Discovery |
| `_mcp._agents.arssan.com` | `HTTPS` | `1` | `arssan.com.` | `alpn="mcp" port=443` | Model Context Protocol (MCP) |
| `_index._agents.arssan.com` | `TXT` | - | - | `v=DNS-AID1; uri=https://arssan.com/.well-known/ai-catalog.json` | Fallback machine-readable index |

---

## How to Publish

### Option A: Cloudflare Dashboard (GUI)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **arssan.com** -> **DNS** -> **Records**.
2. Click **Add record** for each of the following:

   #### 1. Organizational Index Record
   - **Type:** `HTTPS`
   - **Name:** `_index._agents`
   - **Priority:** `1`
   - **Target:** `arssan.com`
   - **Value:** `alpn="h2,h3" port="443"` (or `alpn=h2,h3 port=443`)
   - **TTL:** `Auto`

   #### 2. Agent-to-Agent (A2A) Record
   - **Type:** `HTTPS`
   - **Name:** `_a2a._agents`
   - **Priority:** `1`
   - **Target:** `arssan.com`
   - **Value:** `alpn="a2a" port="443"` (or `alpn=a2a port=443`)
   - **TTL:** `Auto`

   #### 3. Model Context Protocol (MCP) Record
   - **Type:** `HTTPS`
   - **Name:** `_mcp._agents`
   - **Priority:** `1`
   - **Target:** `arssan.com`
   - **Value:** `alpn="mcp" port="443"` (or `alpn=mcp port=443`)
   - **TTL:** `Auto`

   #### 4. Fallback TXT Record
   - **Type:** `TXT`
   - **Name:** `_index._agents`
   - **Content:** `v=DNS-AID1; uri=https://arssan.com/.well-known/ai-catalog.json`
   - **TTL:** `Auto`

3. Ensure **DNSSEC** remains enabled under **DNS** -> **Settings** (Cloudflare automatically signs these records with RRSIG).

---

### Option B: Cloudflare Zone File Import (1-Click)

In the Cloudflare DNS dashboard:
1. Go to **DNS** -> **Records** -> **Advanced**.
2. Select **Import DNS Records**.
3. Upload [`dns/arssan.com-dns-aid.zone`](./arssan.com-dns-aid.zone).

---

### Option C: Automated API Script

Run the included publisher script with your Cloudflare API token:

```bash
# Windows PowerShell
$env:CLOUDFLARE_API_TOKEN="your_cloudflare_api_token"
npm run dns:publish

# Linux / macOS
CLOUDFLARE_API_TOKEN="your_cloudflare_api_token" npm run dns:publish
```

---

## Verification & Testing

Verify that validating resolvers return authenticated data (`AD=true` via DNSSEC):

```bash
npm run dns:verify
```

Or trigger an immediate scan via `isitagentready.com`:

```bash
curl -X POST "https://isitagentready.com/api/scan" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://arssan.com"}'
```

The check `checks.discoverability.dnsAid.status` will return `"pass"`.
