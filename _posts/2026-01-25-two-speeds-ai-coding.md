---
layout: post
title: "The Two Speeds of AI Coding"
date: 2026-01-25 10:00:00 +0000
categories: ai development
tags: [ai, coding, gas-town, github-copilot, claude, automation, developer-tools]
author: Shaun Smith
excerpt: "After months of building with AI coding tools, I've landed on two very different workflows. Gas Town for autonomous orchestration, Copilot for mobile iteration. Different gears for different problems."
---

![Hero - Two speeds of AI coding](/assets/images/2026-01-25-two-speeds-ai-coding/hero.png)

I have two AI coding workflows. One runs while I sleep. The other ships from the school pickup line. I'm also building a third, but that's a story for another post.

Not because one is better than the others, but because they solve completely different problems.

## The Heavy Machinery: Gas Town

[Steve Yegge's Gas Town](https://github.com/steveyegge/gastown) is a multi-agent orchestrator for Claude Code. You spin up a "rig" for your project, talk to the "Mayor" (your coordinating Claude instance), and set a "convoy" of agents loose on your codebase. It's autonomous coding at scale.

When I want to build something substantial, this is my weapon of choice.

The workflow looks like this: I sit down with Claude, spend proper time fleshing out what I actually want. We talk through the feature, the edge cases, the integration points. I document it properly. Then I hand it to the Mayor, start the convoy, and walk away.

If I've done my homework, I come back to working software.

![Gas Town - Multiple agents working autonomously](/assets/images/2026-01-25-two-speeds-ai-coding/gas-town.png)
*The system works while you don't.*

My [Nota-Orbis](https://github.com/TechnicallyShaun/nota-orbis) project (a PKM automation system with voice transcription pipelines and AI-powered triage) runs entirely on this model. Features go from idea to merged PR while I'm making dinner.

But here's the catch: **autonomous agents are only as good as your specifications.**

If my idea isn't thoroughly documented, I burn through API credits at an alarming rate with nothing to show for it but broken tests and confused agents stepping on each other. It's like deploying an army of enthusiastic interns: incredible output when directed well, chaos when not.

---

## The Swiss Army Knife: GitHub Copilot

GitHub Copilot is the opposite philosophy. It's in my pocket. Anywhere in the world, I can crack open GitHub Mobile, dictate a quick thought, and have a pull request ready in minutes.

I've shipped bug fixes from the school pickup line. Added validation from a coffee shop. The friction is nearly zero.

![Copilot - Mobile coding on the go](/assets/images/2026-01-25-two-speeds-ai-coding/copilot.png)
*Ship from anywhere.*

But Copilot doesn't do autonomy. Larger problems, no matter how well I describe them, don't land cleanly. I have to decompose everything myself. Feature becomes epic becomes story becomes task becomes individual prompt. Each piece needs its own PR. I'm the orchestrator, managing the process step by step.

And even for quick features, without extremely thorough descriptions, I *always* end up with broken linters, missed edge cases, implementations that technically work but miss the point. Copilot is fast, but it doesn't pause to think. It doesn't question my assumptions. It just... does.

I must type "MAKE SURE THE LINTER PASSES" about fifteen times a day. It's become muscle memory. Meanwhile, Gas Town just... handles it. The agents run the linter, fix their own mess, and move on. Claude magic, I suppose.

---

## The Real Insight

Neither tool is better. They're different gears.

**Gas Town** is for when I have time to plan, when the feature is big enough to warrant the setup, when I want to set-and-forget.

**Copilot** is for when I have five minutes between meetings, when I just need a quick fix shipped, when mobility matters more than polish.

The magic is knowing which gear to use.

---

## What Nobody Talks About

Here's the part that surprises me most: **I'm having so much fun building.**

Twenty years as a professional developer, and I'd never felt quite like this. At work, you're building for the company's goals. There's process. There are stakeholders. Everything is negotiated.

Now? I think of something I want to exist in the world, and within an hour (sometimes minutes) it exists. The loop from idea to working code has collapsed. Prototypes that would have taken a weekend take an evening. Features I'd have talked myself out of ("too much effort") just... happen.

![Joy - The satisfaction of building](/assets/images/2026-01-25-two-speeds-ai-coding/joy.png)
*This is what it's all about.*

Whether I'm commanding a fleet of agents from my desktop or dictating a quick fix from my phone, the feeling is the same: *I can build whatever I want now.*

And that changes everything.

---

## The Missing Piece

Here's the thing though: everyone's journey through this looks different.

I tried [Claude Squad](https://github.com/smtg-ai/claude-squad) before Gas Town. Similar concept, similar promise. And honestly? Similar friction. These tools are genuinely amazing. We're watching the future of software development unfold in real time. But they're not quite *there* yet.

What's missing isn't capability. It's *fit*.

Every developer has their own rhythm. Their own way of breaking down problems. Their own instincts about when to commit, when to test, when to step back and rethink. These orchestration tools don't know your rhythm yet. They're powerful, but generic.

The gem on the crown (the thing that will make this truly transformative) is when these tools learn how *you* work. Not just "run the linter" but "run the linter the way Shaun runs it, at the moments he'd run it, with the same stubborn insistence on zero warnings." More feedback loops. More learning from the developer's actual patterns.

We're 90% of the way there. The last 10% is personalisation.

I suspect whoever cracks that will change everything. Again. Probably next week too at this rate.
