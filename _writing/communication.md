---
layout: post
title: "Engineering Communication"
date: 2024-07-23
categories: communication collaboration
---

# Engineering Communication

*Notes, tips, and guidance on effective communication within product and engineering organizations, gathered from personal experiences leading technical teams.*

## Core Communication Principles

### BLUF: Bottom Line Up Front
Get to your point quickly and succinctly at the beginning; details come later. This respects your reader's time and ensures key information isn't buried.

### Use Simple Terms
Summarize your points in accessible language, save the jargon for detailed explanations. Not everyone has your technical context.

### Stay Positive and Constructive
Say what you like and what you would like, not what you don't like. A supportive tone is more likely to get a positive response and openness to your suggestion than a critical one.

## Chat and Async Communication

### Channel Guidelines

**Default to public channels** - Private channels and DMs hinder transparency and collaboration. When information is shared openly, it becomes discoverable and helps build organizational knowledge.

**Use threads for specific conversations** - Keep discussions organized and prevent channel clutter by threading replies to specific topics.

**Avoid notification spam** - Each message sends a notification. Take time to collect your thoughts, get to your point directly, and provide all necessary context in a single message when possible.

### Communication Modes

**Chat is for almost-synchronous, ephemeral communication** - Never use chat to document decisions. Important information needs a more permanent medium like documentation or email.

**Real-time sometimes, asynchronous most of the time** - Don't expect immediate responses. People need deep work time, and constant interruption destroys productivity.

**Important announcements need the right medium** - Chat isn't suitable for critical information that people might miss. Use email, documentation, or all-hands meetings for announcements.

## Effective Collaboration

### Context and Clarity Over Brevity
Get to the point, but don't assume others have your context. Work to ensure clarity and provide the background information needed to understand your message.

### Announce Actions Before Taking Them
Talking through steps before execution has multiple benefits:
- Your brain processes the actions more thoroughly
- Others become aware of what's happening, preventing conflicts or duplication
- People have a chance to reasonably object or suggest alternatives

### Summarize and Close the Loop
- Add summaries to long discussions for easy skimming
- Summarize actions and results after completing work
- Follow up on open threads with outcomes
- Create written records of verbal conversations

## Asking and Answering Good Questions

### The Challenge of Context-Switching

Providing good answers requires significant effort because:

1. **Context loading takes time** - We need background information that's often missing, and switching mental context is expensive
2. **Quality answers require more than facts** - Good answers provide context, references, and knowledge that helps the asker solve similar problems independently

### How to Ask Better Questions

**Provide context about your efforts:**
- Share what you've tried so far and the results
- Explain what you're thinking of doing next
- Show your research and thought process

**Ask for guidance, not just answers:**
- Request help figuring it out yourself
- Ask for direction or resources rather than just the solution

**Examples of well-structured questions:**

> "Hey! I'm trying to configure X for our deployment pipeline, and so far I've tried [solution 1] and [solution 2]. While that's accomplished Y, it hasn't fully resolved the connection timeout issue. Could anyone point me to documentation, suggest a different approach, or help me understand what I might be missing?"

> "I'm trying to figure out the best way to handle database migrations in our CI/CD process. I believe I can do this using [approach 1] or [approach 2], but I'm not sure which fits better with our current infrastructure setup. Does anyone have experience with this who could provide guidance before I proceed?"

### Professional Presence

**Fill out your profile** - As organizations grow, it becomes harder to track who does what. Your profile helps people understand your role, expertise, and how to collaborate with you effectively.

**Contribute thoughtfully** - Jumping into conversations without adding value (like vital knowledge, relevant experience, or constructive input) can be disruptive to productive discussions.

## Documentation and Knowledge Sharing

### Write Things Down
Record actions and results in writing - whether in Slack, PR comments, tickets, or documentation. This creates a searchable trail for rebuilding context later and helps with institutional knowledge.

### Provide Links and Context
When referencing external resources, include both the link and a brief description or summary. Don't assume others know the context of specific PRs, tickets, or documents.

### Create Closure
Follow up on decisions, complete action items, and communicate outcomes. Leaving things hanging creates uncertainty and erodes trust in the team's ability to execute.

## Formatting and Readability

### Master Your Tools
Get familiar with your communication platform's formatting options. Proper formatting dramatically improves the readability and digestibility of your messages.

**Key formatting techniques:**
- Use code blocks for terminal output, configurations, and code snippets
- Use bullet points for lists and action items
- Use headers to structure longer messages
- Use emphasis (bold/italic) strategically for key points

### Structure for Scanning
People often skim messages quickly. Structure your communication so the most important information is easily scannable:
- Lead with the key point
- Use headers and bullet points
- Keep paragraphs short
- Put detailed explanations after the summary

## Meeting and Verbal Communication

### Preparation and Follow-up
- Come prepared with an agenda and clear objectives
- Take notes during discussions
- Send written summaries after meetings with decisions and action items
- Include people who couldn't attend but need the information

### Active Participation
- Ask clarifying questions when something isn't clear
- Speak up when you have relevant information or concerns
- Confirm understanding by restating decisions in your own words

## Remote and Distributed Team Communication

### Overcommunicate Status and Progress
In distributed teams, the casual awareness that comes from physical proximity is lost. Compensate by:
- Sharing regular updates on work progress
- Communicating blockers and dependencies early
- Being explicit about availability and working hours

### Assume Positive Intent
Text-based communication loses emotional nuance. When something seems negative or confrontational, assume positive intent and ask for clarification rather than responding defensively.

## Building Team Communication Culture

### Model Good Behavior
As a leader, your communication patterns set the tone for the team. Consistently demonstrate the practices you want to see:
- Be responsive but not immediately reactive
- Ask good questions and provide thoughtful answers
- Share information openly and document decisions

### Create Communication Standards
Establish team agreements about:
- Response time expectations for different types of messages
- When to use different communication channels
- How to structure common types of communication (status updates, incident reports, etc.)

---

## References and Further Reading

These insights are informed by excellent resources on communication and collaboration:

- [Basecamp's Guide to Internal Communication](https://basecamp.com/guides/how-we-communicate)
- [GitLab Communication Handbook](https://about.gitlab.com/handbook/communication/)
- [37signals on Communication](https://37signals.com/how-we-communicate)
- [Stanford's Think Fast, Talk Smart Podcast](https://www.gsb.stanford.edu/business-podcasts/think-fast-talk-smart)
- [Nature study on communication modes and collaboration](https://www.nature.com/articles/s41562-021-01196-4)

*Effective communication is the foundation of successful engineering teams. These practices have helped me build collaborative environments across multiple organizations and technical contexts.*