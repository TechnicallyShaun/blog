---
layout: post
title: "How Do You Measure a 10x Developer?"
date: 2026-02-26 10:00:00 +0000
categories: ai development
tags: [ai, developer-velocity, metrics, copilot, sdp, series]
author: Shaun Smith
excerpt: "Everyone claims AI makes them faster. I wanted proof. So I scraped three years of my own work data and put it on a graph."
---

<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3"></script>

In my [last post](/blog/2026/02/24/moment-ai-clicked/), I talked about the moment AI stopped being a novelty and became something I could actually build with. Leading up to Christmas, vibe coding away, three things hit me: 
- First, I *felt* faster. My workflow had shifted from focusing on a single problem to prompting in one window, reviewing output in another, and knowing I could spin up a third. 
- Second, I could *see* the potential. Even in those early weeks I could tell this method had room to grow. 
- And third, I was having more fun coding than I'd had in years.

But feeling faster isn't evidence. There's no point paying for subscriptions and learning new tools if they're not actually increasing your throughput.

So before I went any deeper, I needed to answer a few simple questions: **Am I going faster? How much faster? And how much faster *could* I go?**
![Measuring speed](/assets/images/2026-02-26-measuring-dev-velocity/measuring-speed.png)
## The Problem With Measuring Developers

How do you measure a developer's output? The industry has been arguing about this for decades:

- **Lines of code:** meaningless. *More code is frequently worse code*.
- **Story points per sprint:** guestimate. Not the be-all and end-all, but not nothing either.
- **Tickets closed:** There's some meaning in volume, but no definition of size.
- **Cycle time:** The most honest metric, but heavily influenced by reviews and blockers which are out of mine (and AI's) control. 

None of these work in isolation. But looking at them as averages, and in relation to each other, I think there's something useful we can draw from the combination. One metric lies. Several metrics together start telling a story.

Future posts in this series will add more dimensions: cycle time distributions, PR review turnaround, and rework rate. I'll backfill the data so we can see the full picture as it develops.

## Getting My Own Data

Stats like these aren't readily available in our system. And it's not something I'm going to ask the boss for, you know, just in case it shows I've been coasting for three years.

So I went and got them myself, using the MCP I'd built (from the [previous post](/blog/2026/02/24/moment-ai-clicked/)). I scraped our ticketing system and paired it with git history. For every ticket I'd worked on since joining the company in early 2023, I pulled:

- Ticket number and type (story vs bug)
- Story points (where assigned)
- Start and completion dates

<div class="callout">
<h4>🧠 Zero Effort Analysis</h4>
<p>AI built the MCP tool that fetches ticket information. AI also built the data scraper that cross-references the git graph for ticket numbers and enriches it with that ticket data. There was very little raw effort from me in building either of those tools.</p>
<p>So we have AI building the instruments that measure AI's own impact. </p>
<p>Recursive, and worth noting.</p>
</div>

That gave me over **170 tickets across nearly three years**, nearly 70 stories and around 100 bugs (not all mine!) - Rookie numbers. We need to get them up.
![Rookie numbers](/assets/images/2026-02-26-measuring-dev-velocity/rookie-numbers.png)

I dumped it all into a CSV and started looking for patterns.

## The Full Picture

Here's every fortnightly sprint since joining the company in March 2023. Story points (light blue), stories closed (dark blue), and bugs closed (red) all in one view:

<div class="chart-container"><canvas id="fullChart" style="max-width:100%; height:400px;"></canvas>
<script>
(function() {
  var labels = ["Mar 23","","","","May 23","","","","Jul 23","","","","Aug 23","","","","Oct 23","","","","Dec 23","","","","Feb 24","","","","Apr 24","","","","Jun 24","","","","Jul 24","","","","Sep 24","","","","Nov 24","","","","Jan 25","","","","Mar 25","","","","May 25","","","","Jun 25","","","","Aug 25","","","","Oct 25","","","","Dec 25","","","","Feb 26",""];
  var points = [3,5,2,0,0,0,21,5,5,0,0,0,13,0,0,0,0,0,10,2,0,3,8,16,21,3,13,0,0,0,0,13,5,5,0,8,0,8,7,17,9,0,20,8,13,0,8,0,0,0,0,8,5,13,0,8,10,3,28,0,0,8,0,41,0,0,13,8,0,5,5,2,0,0,14,8,0,0];
  var stories = [1,1,1,0,0,0,2,1,1,0,0,0,1,0,0,0,0,0,2,1,0,1,1,2,4,1,2,0,0,0,0,2,1,1,0,1,0,2,2,4,3,0,1,1,1,0,1,0,0,0,0,1,1,1,0,1,2,1,2,0,0,1,0,3,0,0,2,2,0,1,1,1,0,0,3,2,0,0];
  var bugs = [0,0,1,2,1,0,0,4,1,3,1,1,0,2,1,2,1,0,2,1,0,0,0,0,2,0,2,2,0,2,0,0,3,1,2,1,1,0,3,2,3,0,0,0,1,0,0,3,8,2,1,2,4,3,2,0,0,1,0,5,1,4,0,0,1,2,1,1,4,4,6,1,0,1,2,1,0,0];
  var sma = [null,null,null,null,null,null,null,4.5,4.8,4.1,3.9,3.9,5.5,5.5,2.9,2.3,1.6,1.6,2.9,3.1,1.5,1.9,2.9,4.9,7.5,7.9,8.3,8.0,8.0,7.6,6.6,6.3,4.3,4.5,2.9,3.9,3.9,4.9,5.8,6.3,6.8,6.1,8.6,8.6,10.3,9.3,9.4,7.3,6.1,6.1,3.6,3.6,2.6,4.3,3.3,4.3,5.5,5.9,9.4,8.4,7.8,7.1,7.1,11.3,10.0,9.6,7.8,8.8,8.8,8.4,9.0,4.1,4.1,4.1,4.3,4.3,4.3,3.6];
  new Chart(document.getElementById('fullChart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        { label: 'Story Points', data: points, backgroundColor: 'rgba(125,211,252,0.5)', borderColor: 'rgba(125,211,252,1)', borderWidth: 1, order: 4 },
        { label: 'Stories Closed', data: stories, backgroundColor: 'rgba(30,64,175,0.7)', borderColor: 'rgba(30,64,175,1)', borderWidth: 1, order: 3 },
        { label: 'Bugs Closed', data: bugs, backgroundColor: 'rgba(239,68,68,0.5)', borderColor: 'rgba(239,68,68,1)', borderWidth: 1, order: 2 },
        { label: 'Points SMA (16wk)', data: sma, type: 'line', borderColor: 'rgba(74,222,128,0.8)', borderWidth: 2, pointRadius: 0, fill: false, tension: 0.3, order: 1 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Count', color: '#999' }, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#999' } },
        x: { grid: { display: false }, ticks: { color: '#999', maxRotation: 45, autoSkip: true, maxTicksLimit: 15 } }
      },
      plugins: {
        legend: { labels: { color: '#ccc' } },
        annotation: {
          annotations: {
            summer23: { type: 'box', xMin: 9, xMax: 11, backgroundColor: 'rgba(100,150,255,0.15)', borderWidth: 0, label: { display: true, content: '🏖️', position: 'start' }},
            xmas23: { type: 'box', xMin: 20, xMax: 21, backgroundColor: 'rgba(100,150,255,0.15)', borderWidth: 0, label: { display: true, content: '🎄', position: 'start' }},
            summer24: { type: 'box', xMin: 35, xMax: 37, backgroundColor: 'rgba(100,150,255,0.15)', borderWidth: 0, label: { display: true, content: '🏖️', position: 'start' }},
            xmas24: { type: 'box', xMin: 46, xMax: 47, backgroundColor: 'rgba(100,150,255,0.15)', borderWidth: 0, label: { display: true, content: '🎄', position: 'start' }},
            summer25: { type: 'box', xMin: 61, xMax: 63, backgroundColor: 'rgba(100,150,255,0.15)', borderWidth: 0, label: { display: true, content: '🏖️', position: 'start' }},
            xmas25: { type: 'box', xMin: 72, xMax: 73, backgroundColor: 'rgba(100,150,255,0.15)', borderWidth: 0, label: { display: true, content: '🎄', position: 'start' }}
          }
        }
      }
    }
  });
})();
</script></div>

The shaded zones are annual leave. You can see the natural pattern: ramp-up in 2023 as I learned the codebase, a steady rhythm through 2024, and predictable holiday dips every summer and Christmas.

And I'm hoping to make the numbers go up, more! 

![Number go up](/assets/images/2026-02-26-measuring-dev-velocity/number-go-up.png)

## Zooming In: The AI Effect

Now let's zoom into 2025 onwards and mark when AI entered the picture:

<div class="chart-container"><canvas id="zoomChart" style="max-width:100%; height:400px;"></canvas>
<script>
(function() {
  var labels = ["Jan 25","","Feb 25","","Mar 25","","Apr 25","","May 25","","Jun 25","","Jul 25","","Aug 25","","Sep 25","","Oct 25","","Nov 25","","Dec 25","","Dec 25","","Jan 26","","Feb 26"];
  var points = [0,0,8,5,13,0,8,10,3,28,0,0,8,0,41,0,0,13,8,0,5,5,2,0,0,14,8,0,0];
  var tickets = [2,1,3,5,4,2,1,2,2,2,5,1,5,0,3,1,2,3,3,4,5,7,2,0,1,5,3,0,0];
  var sma = [6.1,3.6,3.6,2.6,4.3,3.3,4.3,5.5,5.9,9.4,8.4,7.8,7.1,7.1,11.3,10.0,9.6,7.8,8.8,8.8,8.4,9.0,4.1,4.1,4.1,4.3,4.3,4.3,3.6];
  new Chart(document.getElementById('zoomChart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        { label: 'Story Points', data: points, backgroundColor: 'rgba(125,211,252,0.5)', borderColor: 'rgba(125,211,252,1)', borderWidth: 1, order: 3 },
        { label: 'Tickets Closed', data: tickets, backgroundColor: 'rgba(147,51,234,0.6)', borderColor: 'rgba(147,51,234,1)', borderWidth: 1, order: 2 },
        { label: 'Points SMA (16wk)', data: sma, type: 'line', borderColor: 'rgba(74,222,128,0.8)', borderWidth: 2, pointRadius: 0, fill: false, tension: 0.3, order: 1 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Count', color: '#999' }, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#999' } },
        x: { grid: { display: false }, ticks: { color: '#999', maxRotation: 45, autoSkip: true, maxTicksLimit: 15 } }
      },
      plugins: {
        legend: { labels: { color: '#ccc' } },
        annotation: {
          annotations: {
            summer25: { type: 'box', xMin: 12, xMax: 14, backgroundColor: 'rgba(100,150,255,0.15)', borderWidth: 0, label: { display: true, content: '🏖️', position: 'start' }},
            xmas25: { type: 'box', xMin: 23, xMax: 24, backgroundColor: 'rgba(100,150,255,0.15)', borderWidth: 0, label: { display: true, content: '🎄', position: 'start' }},
            aiExplore: { type: 'line', xMin: 15, xMax: 15, borderColor: 'rgba(255,180,50,0.6)', borderWidth: 2, borderDash: [6,4], label: { display: true, content: 'AI Experimenting', color: '#ffb432', backgroundColor: 'transparent', position: 'start', font: {size: 10} }},
            aiSerious: { type: 'line', xMin: 24, xMax: 24, borderColor: 'rgba(255,80,80,0.7)', borderWidth: 2, borderDash: [6,4], label: { display: true, content: 'AI Serious', color: '#ff5050', backgroundColor: 'transparent', position: 'start' }}
          }
        }
      }
    }
  });
})();
</script></div>

The amber dashed line marks when I started experimenting with AI at work (around September 2025), and the red line is when I got serious about it (January 2026).

## What Does This Actually Tell Me?

It's messy. Real data always is. But a few things stand out:

1. **The August 2025 spike** (41 story points in one sprint). That wasn't AI, just a really good month. It's an outlier, not a trend.
2. **The SMA tells a better story.** Ignore the individual bars. The 16-week moving average shows the real trend, smoothing out the noise of individual sprints.
3. **Holiday dips are predictable.** Every summer and Christmas shows the expected trough. Useful for knowing when to *not* panic about low numbers.
4. **Tickets tell a fuller story.** The purple bars combine stories and bugs into total tickets closed. Story points miss unpointed bugs entirely, so looking at both together gives a more honest picture.

A steady rhythm through 2024, then things start shifting in late 2025 as AI tools entered the workflow. Now we watch for what happens next.

## So Am I Going Faster?

The data says *tentatively yes*, but with caveats:

- Story points are subjective estimates, not objective measurements
- I'm also three years into the codebase now and experience compounds
- **One good sprint doesn't make a trend**

What I *can* say: the baseline from mid-2024 through mid-2025 averaged about **6 story points per sprint**. Since getting serious in January 2026, that's sitting at roughly **7.5 points per sprint**, around a **1.3x improvement**, while also closing more tickets (3.1 vs 2.5 per sprint). It's only three sprints of data, but the early signs are promising.

<div class="callout amber">
<h4>💰 The Adoption Tax</h4>
<p>Some of the time I'd normally spend developing, I'm now spending figuring out how to improve my velocity. There's wasted energy there. If my output still matches the baseline <em>while</em> I'm investing time in learning new tools, that's already a quiet win. I'm hoping the real gains come as the learning curve flattens.</p>
</div>

## This is my baseline

Future improvements in this series can reference back to these charts now. When I build a new tool, automate a new workflow, or try a new approach, I'll have numbers to compare against.

Coding feels faster, I can see the potential and it's genuinely fun too! But I need to get down to the stats and to the evidence. Especially now, while every YouTuber and X post is hyping how we'll all be out of jobs by the end of the year. 

I need something real to help answer the question:

Am I a 10x developer? 

Not yet. But I'm working on it.

*This is part of the [Using AI to Become a 10x Developer](/blog/2026/02/24/moment-ai-clicked/) series.*
