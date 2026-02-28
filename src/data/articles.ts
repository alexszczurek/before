export interface Article {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export const articles: Article[] = [
  {
    slug: "app-store-seo",
    title: "App Store Optimization (ASO)",
    date: "2025-02-28",
    content: `Most apps fail at discovery. Not because the product is bad — because the App Store listing is lazy.

You spent months building something great. Then you slapped on a title, grabbed some screenshots, and hit submit. Sound familiar?

Here's the uncomfortable truth: **70% of App Store visitors find apps through search.** And 65% of all downloads happen immediately after that search. Your app's store listing is doing more selling than your landing page, your Twitter, and your Product Hunt launch combined.

This is everything you need to know to fix it.

---

## The 160 characters that decide your fate

Apple gives you exactly three text fields that affect search rankings. That's it. Everything else — your description, your promotional text — is invisible to the algorithm.

**App Name** — 30 characters. Highest keyword weight.
**Subtitle** — 30 characters. Second highest weight.
**Keyword Field** — 100 characters. Hidden from users. Third weight.

Total: 160 characters. That's less than a tweet. And it's the entire surface area that determines whether your app shows up when someone types a query.

Your description? Apple doesn't index it. It's a conversion tool, not a discovery tool. Same for promotional text. They matter — but only after someone has already found you.

Let's break down each field.

---

## App Name: Brand + your most important keyword

Your title does double duty. It needs to be recognizable *and* discoverable.

Look at how apps in the [before.click directory](https://before.click) handle this:

**Arc Search — Find it, Faster.** Brand name, primary keyword ("Search"), and a value prop that doubles as a subtitle. Smart. Anyone searching "search" or "browser" has a chance of finding this.

**Gentler Streak Workout Tracker.** Notice what they did — the brand IS the keyword. "Workout Tracker" sits right in the title. When Apple named it Watch App of the Year, the listing was already optimized for exactly the search terms a fitness-curious user would type.

Now compare that to an app that just uses its brand name — say, a hypothetical "Endel" with nothing else. Beautiful brand? Absolutely. But if nobody knows the name yet, nobody's searching for it. You're banking entirely on browse traffic and press.

**If you're an indie app without brand recognition, you can't afford a title that's just your name.** Use the formula:

\`Brand — Primary Keyword\` or \`Brand: Keyword Phrase\`

Use all 30 characters. Every unused character is keyword real estate you're throwing away.

And skip filler words like "app," "the," "free," or "best." Apple indexes common terms automatically. They eat your character budget and add nothing.

---

## Subtitle: Expand, don't repeat

The subtitle appears right below your title in search results. It's the first thing people read after your app name.

**The cardinal rule: never duplicate a word that's already in your title.** Apple combines tokens across all three fields. If "workout" is in your title, putting it in your subtitle is wasting characters on a word the algorithm already knows about.

Think of the subtitle as coverage expansion. If your title handles "workout tracker," your subtitle should cover entirely different territory — something like "Health, Steps & Recovery" to capture adjacent searches.

Use \`&\` and \`,\` to squeeze in more terms. Every character counts.

And make it readable. A subtitle stuffed with random keywords tanks your tap-through rate. People see this in search results. It needs to make sense at a glance.

---

## Keyword Field: Your hidden 100-character weapon

This is the field most founders either ignore or screw up. It's invisible to users — it exists solely for the algorithm.

**Formatting matters:**

- Comma-separated, **no spaces after commas** (spaces eat characters)
- Singular forms only (Apple auto-handles plurals)
- Don't repeat ANY word from your title or subtitle
- Don't include your app name, developer name, or category name (Apple indexes these automatically)

**What goes here:**

- Synonyms of your main keywords
- Competitor brand names (yes, this is allowed)
- Common misspellings
- Long-tail variations
- Translated terms from secondary locales

An example. Say you're building a focus/productivity timer. Your title is "Deepwork — Focus Timer" and your subtitle is "Pomodoro & Concentration."

Your keyword field might look like:

\`\`\`
study,productivity,flow,block,distraction,adhd,work,session,interval,music,noise,task,habit,routine
\`\`\`

No spaces after commas. Every character used. Zero duplication with the other two fields.

Count the characters. Fill all 100.

---

## Keyword research without overcomplicating it

You don't need a $200/month tool on day one. Here's the minimal process:

**Step 1: Brainstorm.** Write down every word someone might type when looking for an app like yours. Think verbs ("meditate," "focus," "track"), nouns ("timer," "planner," "journal"), and problems ("can't sleep," "stress," "productivity").

**Step 2: Check autocomplete.** Open the App Store on your phone. Start typing your seed terms. The suggestions Apple gives you are actual user searches. Write them down.

**Step 3: Spy on competitors.** Find the top 5-10 apps in your space. Read their titles, subtitles, and descriptions. Note every keyword they're targeting. A free-tier tool like App Radar or Astro ($9/month) can show you what competitors rank for.

**Step 4: Score and choose.** For each keyword, ask three things:

- **Volume** — are people actually searching this? (tools give you a score)
- **Relevance** — does this genuinely describe your app?
- **Difficulty** — can you realistically crack the top 10?

The sweet spot for indie apps is medium volume + high relevance + low competition. "Photo editor" is dominated by giants. "Vintage film camera" might not be.

**Step 5: Distribute.** Put your top keyword in the title. Complementary terms in the subtitle. Everything else in the keyword field. Zero word overlap between fields.

Pick 15-20 keywords for your first update. Keep another 15-20 in reserve. You'll swap underperformers out in 4-8 weeks.

---

## Screenshots are ads, not documentation

This is where most indie developers lose the conversion game. They take screenshots of their app and upload them. That's not optimization — that's a photo album.

**Your screenshots are advertisements.** Treat them accordingly.

Look at the apps featured on before.click. The ones that stand out — Not Boring Camera, Gentler Streak, Amie — don't just show UI. They tell a story. Each screenshot has a bold caption at the top, a clear visual below, and a reason to keep swiping.

Here's the framework:

| Screenshot | Job |
|---|---|
| **#1** | Main benefit. This is the only one most people see. Make it count. |
| **#2** | What makes you different from alternatives. |
| **#3** | Trust signal — awards, press, user count. Gentler Streak leads with "Apple Watch App of the Year." That's not an accident. |
| **#4–6** | Core features in action. Show the app solving real problems. |
| **#7–8** | New features or updates. Shows the app is alive. |

Every screenshot needs a **text caption**. Users scan captions. They don't study your UI at thumbnail size.

---

## The preview video advantage

Apple auto-plays preview videos in search results — muted. If you don't have one, you're showing a static screenshot where competitors are showing motion.

A few rules:

- Lead with your strongest moment. No logo intros, no fade-ins. You have 3 seconds.
- Add text overlays. Most people watch on mute.
- Show the app doing something, not a marketing sizzle reel.
- Keep it 15-30 seconds. Respect people's time.

This is one of the highest-leverage things an indie developer can do. It's also one of the most skipped.

---

## Ratings: The number next to your name

Your star rating is visible in search results before anyone visits your page. It's a split-second trust signal. Below 4.0, you're fighting a battle that better metadata can't win.

**How to get above 4.5:**

**Ask at the right moment.** Trigger Apple's native rating prompt (SKStoreReviewController) after a "success moment" — the user just completed a task, hit a milestone, or had a positive experience. Never after a crash. Never on first launch.

**Respond to negative reviews.** This matters more than you think. Users can update their rating after seeing a response. A thoughtful reply within 48 hours can flip a 2-star into a 4-star.

**Fix what people complain about.** If 30 reviews mention the same bug, fixing it is ASO work, not just engineering. Then mention the fix in your update notes. People notice.

Gentler Streak's team explicitly asks for App Store reviews in their release notes: "If you find Gentler Streak helpful, leaving a review on the App Store really helps us out." Direct. Honest. Effective. Indie teams should steal this approach.

---

## Localization: Free keyword slots you're probably ignoring

This is the most underused lever in indie ASO.

Apple lets you configure additional locales — separate title, subtitle, and keyword field for each. Even if your app is English-only, you can add metadata for Spanish (Mexico), French (Canada), Portuguese (Brazil), and more.

This effectively **multiplies your keyword coverage** without touching your code.

For a bootstrapped app, this is one of the few genuine "free lunch" opportunities in the App Store. Configure 3-5 additional locales and you've potentially tripled your keyword surface area.

Don't just translate your English keywords. Research what people in each market actually search for. A direct translation often misses the mark.

---

## The paid + organic flywheel

Here's the part nobody tells indie founders:

Apple's algorithm needs download data to rank you. But you need rankings to get downloads. It's a cold-start problem, and pure organic ASO rarely solves it alone for a new app.

**Apple Search Ads is the unlock.** Even a small budget ($10-20/day) targeted at your core keywords generates the initial download velocity the algorithm needs to take your app seriously.

The strategy:

1. Run Search Ads on the same keywords you're optimizing organically
2. Use Search Ads data to find which keywords actually convert (not just rank)
3. Feed those insights back into your organic metadata
4. Scale back paid spend as organic rankings climb

Think of paid as the push that gets the flywheel spinning. Organic is what keeps it spinning.

If you're fundraising, this is a metric investors understand. "We achieve X organic downloads per day at $0 CAC after an initial paid push of $Y" is a powerful story.

---

## The iteration loop

ASO isn't a launch task. It's a monthly habit.

**Every 2-4 weeks:**

1. Check which keywords moved up, which stalled, which dropped
2. Swap underperformers (no movement after 2 cycles = replace)
3. Update metadata in your next build
4. Review screenshot performance — is CVR improving?
5. Read recent reviews for new keyword ideas and product insights

**Track these numbers:**

- Keyword rankings (are you climbing?)
- Impressions from search (are more people seeing you?)
- Tap-through rate (are people clicking?)
- Conversion rate (are they installing?)
- Organic vs. paid install split (is the flywheel working?)

The apps that win the App Store aren't the ones with the biggest budgets. They're the ones that iterate. Every month. Consistently.

---

## Your first week

| Day | Do this |
|---|---|
| **Mon** | Sign up for Astro ($9/mo) or App Radar (free tier). Audit your current title, subtitle, and keyword field. Write down what's missing. |
| **Tue** | Enter your top 5 competitors into the tool. Export their keywords. Build a master list of 50+ candidates. |
| **Wed** | Score and prioritize. Pick 15-20 winners. Draft new title, subtitle, and keyword field — zero word overlap. |
| **Thu** | Rebuild your screenshots using the caption-first framework. If you don't have a preview video, brief one. |
| **Fri** | Add a rating prompt at your app's best "success moment." Submit the metadata update. Set a reminder to check rankings in 7 days. |

Five days. That's what it takes to go from "I never really thought about ASO" to having a real foundation. Everything after that is iteration.

---

Your app deserves to be found. The work you've already done — the design, the code, the obsessing over details — is the hard part. Optimizing 160 characters of metadata and a handful of screenshots is not. But it might be the thing that decides whether anyone ever sees what you built.`,
  },
];
