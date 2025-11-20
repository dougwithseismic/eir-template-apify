# LinkedIn Job Scraper

[![Apify Store](https://img.shields.io/badge/Apify-Store-00D4AA?style=flat-square&logo=apify)](https://apify.com/doug/linkedin-job-scraper)
[![Runs](https://img.shields.io/badge/dynamic/json?color=blue&label=runs&query=%24.stats.totalRuns&url=https%3A%2F%2Fapi.apify.com%2Fv2%2Fstore%2Flinkedin-job-scraper&style=flat-square)](https://apify.com/doug/linkedin-job-scraper/runs)

Extract job postings from LinkedIn with full details - title, company, location, salary, description, and more. Built for recruiters, job seekers, and market researchers.

## What it Does

This actor scrapes LinkedIn job postings to extract complete job data including requirements, benefits, and company info. Perfect for building job boards, salary research, and competitive analysis.

No LinkedIn API required - works with regular web scraping. Handles pagination, dynamic loading, and data extraction automatically.

## Use Cases

- **Job Aggregation** - Build job boards or send daily digests
- **Salary Research** - Track compensation trends across industries
- **Competitive Intelligence** - Monitor competitor hiring patterns
- **Lead Generation** - Find companies actively hiring in your niche

## Features

- ⚡ **Fast** - Processes 200+ jobs per minute
- 🔄 **Reliable** - Auto-retry on failures, handles LinkedIn's rate limits
- 📊 **Complete Data** - Extracts job title, company, salary, remote status, skills, and full description
- 🎯 **Flexible** - Filter by location, experience level, job type, salary range
- 💰 **Cost-Effective** - Uses datacenter proxies by default (~$5 per 10K jobs)

## Input

### Required Fields

**`searchQueries`** (Array)
- Job search terms or URLs
- Example: `["software engineer", "product manager"]`
- Or direct URLs: `["https://www.linkedin.com/jobs/search/?keywords=developer"]`

### Optional Fields

**`maxJobs`** (Integer)
- Maximum number of jobs to scrape
- Default: `100`
- Range: `1` - `10000`

**`location`** (String)
- Filter jobs by location
- Example: `"San Francisco, CA"`

**`experienceLevel`** (Array)
- Filter by experience: `["Entry level", "Mid-Senior level", "Director", "Executive"]`

**`jobType`** (Array)
- Filter by type: `["Full-time", "Part-time", "Contract", "Internship"]`

**`remoteFilter`** (String)
- Options: `"On-site"`, `"Remote"`, `"Hybrid"`

**`postedDate`** (String)
- Filter by recency: `"Past 24 hours"`, `"Past Week"`, `"Past Month"`

**`proxyConfiguration`** (Object)
- Default: Apify datacenter proxies
- For tougher scraping: `{ "useApifyProxy": true, "apifyProxyGroups": ["RESIDENTIAL"] }`

### Example Input

```json
{
  "searchQueries": ["software engineer", "frontend developer"],
  "maxJobs": 500,
  "location": "San Francisco Bay Area",
  "experienceLevel": ["Mid-Senior level"],
  "jobType": ["Full-time"],
  "remoteFilter": "Remote",
  "postedDate": "Past Week",
  "proxyConfiguration": {
    "useApifyProxy": true
  }
}
```

## Output

Each job is stored as:

```json
{
  "url": "https://www.linkedin.com/jobs/view/3456789",
  "title": "Senior Software Engineer",
  "company": "TechCorp Inc.",
  "location": "San Francisco, CA (Remote)",
  "employmentType": "Full-time",
  "seniorityLevel": "Mid-Senior level",
  "salary": "$150,000 - $200,000/year",
  "description": "We're looking for...",
  "requirements": ["5+ years experience", "React", "TypeScript"],
  "benefits": ["Health insurance", "401k", "Remote work"],
  "applicants": 127,
  "postedDate": "2024-01-15",
  "scrapedAt": "2024-01-20T10:30:00.000Z"
}
```

## How to Use

### In Apify Console

1. Go to [Apify Store](https://apify.com/doug/linkedin-job-scraper)
2. Click "Try for free"
3. Enter search queries and filters
4. Click "Start"
5. Download as JSON/CSV/Excel

### Via API (JavaScript)

```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: 'YOUR_TOKEN' });

const run = await client.actor('doug/linkedin-job-scraper').call({
    searchQueries: ['product manager'],
    location: 'New York, NY',
    maxJobs: 100,
});

const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
```

### Via Python

```python
from apify_client import ApifyClient

client = ApifyClient('YOUR_TOKEN')
run = client.actor('doug/linkedin-job-scraper').call(
    run_input={
        'searchQueries': ['data scientist'],
        'location': 'Remote',
        'maxJobs': 200
    }
)

for item in client.dataset(run['defaultDatasetId']).iterate_items():
    print(f"{item['title']} at {item['company']}")
```

## Performance & Cost

**Speed:** ~200 jobs/minute
**Average run:** 5 minutes for 1,000 jobs

**Cost:**
- ~$5 per 10,000 jobs (datacenter proxies)
- ~$15 per 10,000 jobs (residential proxies)
- Based on Apify's [pricing](https://apify.com/pricing)

## Troubleshooting

**Getting blocked?**
→ Enable residential proxies in input

**Missing salary data?**
→ Not all LinkedIn postings include salary (only ~30% do)

**Slow performance?**
→ Reduce `maxJobs` or use datacenter proxies

Need help? Email [doug@example.com](mailto:doug@example.com)

## Privacy & Legal

- Scrapes only publicly available job postings
- No personal data collection
- Check LinkedIn's Terms of Service before commercial use

---

Built with [Apify Actor Template](https://github.com/doug/apify-template)
