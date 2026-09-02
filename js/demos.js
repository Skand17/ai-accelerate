/* Synaptro.AI — interactive AI demos (static simulations, no backend).
   One modal shell (#demo-modal); each demo = { meta, render(), run(ctx) }.
   Mock data lives in DEMO_DATA, presentation in the render/run functions.
   All sequences are cancelable: every open/reset bumps `runToken` and
   in-flight timelines check ctx.alive() before each step. */
(function () {
  "use strict";

  var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- tiny inline icon set (lucide-style strokes) ---------- */
  function svg(inner, cls) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon' + (cls ? " " + cls : "") + '" aria-hidden="true">' + inner + "</svg>";
  }
  var I = {
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    arrow: svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
    alert: svg('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
    calendar: svg('<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>'),
    mail: svg('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
    search: svg('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
    userPlus: svg('<path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M19 16v6"/><path d="M22 19h-6"/>'),
    filter: svg('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'),
    database: svg('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>'),
    zap: svg('<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>'),
    sparkle: svg('<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>'),
    file: svg('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>'),
    phone: svg('<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>'),
  };

  /* ---------- mock data ---------- */
  var DEMO_DATA = {
    sales: {
      chat: [
        { who: "user", text: "We're looking for an automation solution for our sales team." },
        { who: "ai", text: "Absolutely. How large is your sales team?", fill: null },
        { who: "user", text: "About 50 people." },
        { who: "ai", text: "Got it. Are you currently using Salesforce?", fill: "size" },
        { who: "user", text: "Yes." },
        { who: "ai", text: "Thanks. Based on that, I think we can help streamline several parts of your sales workflow.", fill: "crm" },
      ],
      fields: [
        { key: "size", label: "Company size", value: "50 employees" },
        { key: "usecase", label: "Use case", value: "Sales Automation" },
        { key: "crm", label: "CRM", value: "Salesforce" },
        { key: "budget", label: "Budget", value: "$20k–$50k" },
      ],
      score: 92,
      outcome: "<b>Qualified in 40 seconds.</b>&nbsp;15 minutes of discovery handled before a rep ever picks up the phone.",
    },
    support: {
      scenarios: [
        {
          customer: "My order hasn't arrived yet.",
          ai: "I found your order #48291. It is currently out for delivery and expected to arrive today.",
          fields: [
            ["Intent", "Order Status", "acc"],
            ["Customer", "Rahul Sharma", ""],
            ["Order", "#48291", ""],
            ["Resolution", "Automated", "ok"],
          ],
          confidence: 97,
          checks: ["Customer identified", "Order found", "Issue resolved", "CRM updated"],
          outcome: "<b>Resolved in 4.2 seconds</b>&nbsp;— no ticket, no queue, no agent time.",
        },
        {
          customer: "Can I change the delivery address on my order?",
          ai: "Of course. I've updated the delivery address on order #48291 to the new address on your profile — you'll receive a confirmation email shortly.",
          fields: [
            ["Intent", "Address Change", "acc"],
            ["Customer", "Rahul Sharma", ""],
            ["Order", "#48291", ""],
            ["Resolution", "Automated", "ok"],
          ],
          confidence: 94,
          checks: ["Customer identified", "Address validated", "Order updated", "Confirmation sent"],
          outcome: "<b>Second issue resolved automatically.</b>&nbsp;Every routine request handled without your team.",
        },
      ],
    },
    document: {
      file: { name: "Acme_Contract.pdf", meta: "12 pages · 1.4 MB" },
      fields: [
        ["Contract value", "$240,000", ""],
        ["Renewal date", "Dec 12, 2027", ""],
        ["Payment terms", "Net 30", ""],
        ["Risk level", "Medium", "warn"],
      ],
      summary: "Contract contains a renewal clause with a 90-day notification requirement.",
      risks: [
        { title: "Auto-renewal clause", detail: "Renews automatically unless cancelled in writing 90 days before Dec 12, 2027." },
        { title: "Liability cap below standard", detail: "Cap set at 6 months of fees — below the 12-month market norm." },
        { title: "Unilateral price escalation", detail: "Vendor may raise fees up to 8% annually without renegotiation." },
      ],
      outcome: "<b>47 data points extracted, 3 risks flagged</b>&nbsp;— roughly 4 hours of manual review saved.",
    },
    voice: {
      startSeconds: 161, // 00:02:41
      lines: [
        { who: "ai", text: "Hi Sarah, I'm calling regarding your appointment tomorrow." },
        { who: "cust", text: "Yes." },
        { who: "ai", text: "Would 3 PM work better for you?" },
        { who: "cust", text: "Yes, that works." },
        { who: "ai", text: "Perfect. I've moved your appointment to 3 PM." },
      ],
      results: ["Appointment Rescheduled", "CRM Updated", "Confirmation Sent"],
      summary: "Sarah confirmed the reschedule to 3:00 PM tomorrow. The calendar was updated in real time, the CRM record was amended, and an SMS confirmation was sent — total handling time 2 minutes 58 seconds, no human involvement.",
      outcome: "<b>Call handled end-to-end by AI</b>&nbsp;— zero staff minutes, zero missed follow-ups.",
    },
    analyst: {
      questions: [
        {
          q: "Why did revenue decrease last month?",
          kpiLabel: "Revenue",
          from: "$42.8M", to: "$38.2M", toNum: 38.2, prefix: "$", suffix: "M",
          delta: "-10.7%", deltaUp: false,
          reasons: ["Enterprise sales ↓ 14%", "Churn increased 2.1%", "North region ↓ 18%"],
          rec: "Focus on the North region and investigate the increase in enterprise churn.",
          series: [42.1, 43.6, 42.9, 44.2, 42.8, 38.2],
          drop: true,
          outcome: "<b>Root cause in 9 seconds</b>&nbsp;— not an afternoon of spreadsheet archaeology.",
        },
        {
          q: "Which region performed best last month?",
          kpiLabel: "West region revenue",
          from: "$11.3M", to: "$12.4M", toNum: 12.4, prefix: "$", suffix: "M",
          delta: "+9.3%", deltaUp: true,
          reasons: ["Expansion deals ↑ 22%", "14 new enterprise logos", "Win rate up to 31%"],
          rec: "Replicate the West region's expansion playbook in North and East next quarter.",
          series: [9.8, 10.4, 10.9, 11.1, 11.3, 12.4],
          drop: false,
          outcome: "<b>Follow-up answered instantly</b>&nbsp;— your data team never left their real work.",
        },
      ],
    },
    research: {
      url: "acme.com",
      steps: ["Analyzing website...", "Finding company information...", "Analyzing technology...", "Identifying business signals...", "Generating opportunity..."],
      profile: [
        ["Industry", "SaaS", ""],
        ["Employees", "250", ""],
        ["Revenue", "$35M", ""],
      ],
      stack: ["Salesforce", "HubSpot", "AWS", "React"],
      signals: [
        { icon: "🔥", text: "Hiring 12 engineers", cls: "hot" },
        { icon: "🔥", text: "Recently raised $20M", cls: "hot" },
        { icon: "⚡", text: "Expanding into Europe", cls: "warn" },
      ],
      opportunity: "Acme could benefit from automating customer onboarding.",
      email: {
        to: "VP Operations, Acme Inc.",
        subject: "Automating onboarding as Acme scales into Europe",
        body: "Hi — congrats on the $20M raise. As you add 12 engineers and expand into Europe, onboarding volume is about to spike. We help SaaS teams like yours automate it end-to-end. Worth a 20-minute look?",
      },
      outcome: "<b>Account research an SDR spends 25 minutes on</b>&nbsp;— generated in 9 seconds.",
    },
    workflow: {
      nodes: [
        { icon: "userPlus", title: "New Lead" },
        { icon: "search", title: "AI Research" },
        { icon: "filter", title: "AI Qualification" },
        { icon: "mail", title: "AI Personalized Email" },
        { icon: "database", title: "CRM Update" },
      ],
      execTime: "12.4 sec",
      checks: ["Lead researched", "Lead qualified", "Email generated", "CRM updated"],
      outcome: "<b>What took your team 45 minutes per lead</b>&nbsp;now runs in 12.4 seconds — on every lead, around the clock.",
    },
    recruiting: {
      job: "Senior Backend Engineer",
      applications: 127,
      candidates: [
        { name: "Sarah Johnson", match: 94, years: "8 years experience", skills: "Python · AWS · Kubernetes", reasoning: "Strong match due to backend architecture experience, AWS expertise, and Kubernetes production experience." },
        { name: "Alex Morgan", match: 89, years: "6 years experience", skills: "Node.js · Kubernetes", reasoning: "Solid Node.js background with Kubernetes at production scale; slightly less cloud-architecture depth than the top candidate." },
        { name: "Daniel Smith", match: 81, years: "5 years experience", skills: "Python · GCP", reasoning: "Good Python fundamentals and GCP experience; fewer years operating high-throughput production systems." },
      ],
      outcome: "<b>127 applications screened in seconds</b>&nbsp;— your team interviews only the top three.",
    },
  };

  /* ---------- timeline helpers ---------- */
  var runToken = 0;

  function makeCtx(root) {
    var id = ++runToken;
    var timers = [];
    var ctx = {
      root: root,
      alive: function () { return id === runToken; },
      wait: function (ms) {
        return new Promise(function (res) {
          var t = setTimeout(res, RM ? Math.min(ms, 40) : ms);
          timers.push(t);
        });
      },
      qs: function (sel) { return root.querySelector(sel); },
      qsa: function (sel) { return Array.prototype.slice.call(root.querySelectorAll(sel)); },
      stage: setStage,
    };
    ctx.type = function (el, text) {
      // per-character typing for AI replies
      return new Promise(function (res) {
        if (RM) { el.textContent = text; res(); return; }
        var i = 0;
        (function tick() {
          if (!ctx.alive()) return res();
          el.textContent = text.slice(0, ++i);
          if (i < text.length) { timers.push(setTimeout(tick, 14)); } else res();
        })();
      });
    };
    ctx.count = function (el, to, opts) {
      opts = opts || {};
      return new Promise(function (res) {
        if (RM) { el.textContent = (opts.prefix || "") + to + (opts.suffix || ""); res(); return; }
        var dur = opts.dur || 900, start = null, dec = opts.decimals || 0;
        (function frame(ts) {
          if (!ctx.alive()) return res();
          if (start === null) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (opts.prefix || "") + (eased * to).toFixed(dec) + (opts.suffix || "");
          if (p < 1) requestAnimationFrame(frame); else res();
        })(performance.now());
      });
    };
    return ctx;
  }

  /* ---------- modal shell ---------- */
  var overlay = document.getElementById("demo-modal");
  if (!overlay) return;
  var bodyEl = document.getElementById("dm-body");
  var titleEl = document.getElementById("dm-title");
  var catEl = document.getElementById("dm-cat");
  var descEl = document.getElementById("dm-desc");
  var stagesEl = document.getElementById("dm-stages");
  var currentId = null;
  var lastFocus = null;

  function setStage(n) {
    Array.prototype.forEach.call(stagesEl.querySelectorAll(".dm-stage"), function (s) {
      var i = +s.getAttribute("data-stage");
      s.classList.toggle("done", i < n);
      s.classList.toggle("active", i === n);
    });
  }

  function openDemo(id) {
    var demo = DEMOS[id];
    if (!demo) return;
    currentId = id;
    lastFocus = document.activeElement;
    catEl.textContent = demo.cat;
    titleEl.textContent = demo.title;
    descEl.textContent = demo.desc;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("dm-lock");
    startDemo();
    var closeBtn = document.getElementById("dm-close");
    if (closeBtn) closeBtn.focus();
  }

  function startDemo() {
    var demo = DEMOS[currentId];
    // Fresh root per run: event listeners and closures from a previous
    // run (or reset) die with the old element instead of leaking.
    bodyEl.innerHTML = "";
    var inner = document.createElement("div");
    inner.innerHTML = demo.render();
    bodyEl.appendChild(inner);
    bodyEl.scrollTop = 0;
    setStage(0);
    var ctx = makeCtx(inner);
    demo.run(ctx);
  }

  function closeDemo() {
    runToken++; // cancel running timelines
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("dm-lock");
    setTimeout(function () { if (!overlay.classList.contains("open")) bodyEl.innerHTML = ""; }, 300);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.getElementById("dm-close").addEventListener("click", closeDemo);
  document.getElementById("dm-reset").addEventListener("click", function () { if (currentId) startDemo(); });
  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeDemo(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeDemo();
  });

  /* ---------- shared render helpers ---------- */
  function kvRows(fields) {
    return fields.map(function (f) {
      var label = f[0] !== undefined ? f[0] : f.label;
      var value = f[1] !== undefined ? f[1] : f.value;
      var cls = (f[2] !== undefined ? f[2] : f.cls) || "";
      var key = f.key ? ' data-key="' + f.key + '"' : "";
      return '<div class="dx-kv"' + key + '><span>' + label + '</span><b class="' + cls + '">' + value + "</b></div>";
    }).join("");
  }
  function checkList(items) {
    return '<ul class="dx-checks">' + items.map(function (t) { return "<li>" + I.check + "<span>" + t + "</span></li>"; }).join("") + "</ul>";
  }
  function outcomeBar(html) {
    return '<div class="dx-outcome" data-outcome>' + I.zap + "<span>" + html + "</span></div>";
  }
  function showKvSequential(ctx, panel, delay) {
    var rows = Array.prototype.slice.call(panel.querySelectorAll(".dx-kv"));
    var p = Promise.resolve();
    rows.forEach(function (row) {
      p = p.then(function () {
        if (!ctx.alive()) return;
        row.classList.add("on");
        return ctx.wait(delay || 260);
      });
    });
    return p;
  }
  function showChecksSequential(ctx, panel, delay) {
    var items = Array.prototype.slice.call(panel.querySelectorAll(".dx-checks li"));
    var p = Promise.resolve();
    items.forEach(function (li) {
      p = p.then(function () {
        if (!ctx.alive()) return;
        li.classList.add("on");
        return ctx.wait(delay || 300);
      });
    });
    return p;
  }
  function showOutcome(ctx) {
    var o = ctx.qs("[data-outcome]");
    if (o) o.classList.add("on");
    ctx.stage(3);
  }
  function chatTyping() {
    return '<div class="dx-typing"><span></span><span></span><span></span></div>';
  }
  function addMsg(chat, who, label) {
    var div = document.createElement("div");
    div.className = "dx-msg " + who;
    div.innerHTML = '<span class="dx-who">' + label + '</span><span class="dx-text"></span>';
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
    return div.querySelector(".dx-text");
  }
  // Plays a chat script: user lines appear, AI lines get typing dots then typed text.
  function playChat(ctx, chat, script, labels, onLine) {
    var p = Promise.resolve();
    script.forEach(function (line, idx) {
      p = p.then(function () {
        if (!ctx.alive()) return;
        if (line.who === "user" || line.who === "cust") {
          var el = addMsg(chat, "user", labels.user);
          el.textContent = line.text;
          return ctx.wait(700).then(function () { if (onLine) return onLine(line, idx); });
        }
        var t = document.createElement("div");
        t.innerHTML = chatTyping();
        t = t.firstChild;
        chat.appendChild(t);
        chat.scrollTop = chat.scrollHeight;
        return ctx.wait(RM ? 40 : 750).then(function () {
          if (!ctx.alive()) return;
          t.remove();
          var el = addMsg(chat, "ai", labels.ai);
          return ctx.type(el, line.text);
        }).then(function () {
          if (!ctx.alive()) return;
          return ctx.wait(450).then(function () { if (onLine) return onLine(line, idx); });
        });
      });
    });
    return p;
  }

  /* ================================================================
     DEMO DEFINITIONS
     ================================================================ */
  var DEMOS = {};

  /* ---------- 01 · Sales agent ---------- */
  DEMOS.sales = {
    cat: "Sales Automation · Demo 01",
    title: "AI Sales Agent",
    desc: "Qualify leads, answer questions, and move prospects toward a meeting — automatically.",
    render: function () {
      var d = DEMO_DATA.sales;
      return '<div class="dx-grid">' +
        '<div class="dx-panel"><span class="dx-label">' + I.sparkle + 'Live conversation</span><div class="dx-chat" data-chat></div></div>' +
        '<div class="dx-panel"><span class="dx-label">Lead qualification</span>' +
        kvRows(d.fields) +
        '<div class="dx-score"><span class="dx-score-num" data-score>—</span><span class="dx-score-bar"><i data-scorebar></i></span></div>' +
        '<div class="dx-btn-row"><span class="dx-tag ok" data-qualified style="display:none">' + I.check + 'Qualified Lead</span></div>' +
        '<div class="dx-btn-row"><button class="dx-btn" data-book style="display:none">' + I.calendar + 'Book Meeting</button></div>' +
        "</div></div>" + outcomeBar(DEMO_DATA.sales.outcome);
    },
    run: function (ctx) {
      var d = DEMO_DATA.sales;
      var chat = ctx.qs("[data-chat]");
      var rows = ctx.qsa(".dx-kv");
      function fillRow(i) { if (rows[i]) rows[i].classList.add("on"); }
      ctx.stage(0);
      playChat(ctx, chat, d.chat, { user: "Prospect", ai: "Synaptro Sales AI" }, function (line, idx) {
        if (idx === 1) { ctx.stage(1); fillRow(1); } // use case captured
        if (idx === 3) fillRow(0); // company size
        if (idx === 5) { fillRow(2); fillRow(3); }
      }).then(function () {
        if (!ctx.alive()) return;
        ctx.stage(2);
        var bar = ctx.qs("[data-scorebar]");
        if (bar) bar.style.width = d.score + "%";
        return ctx.count(ctx.qs("[data-score]"), d.score, { suffix: "/100", dur: 1000 });
      }).then(function () {
        if (!ctx.alive()) return;
        var q = ctx.qs("[data-qualified]"); if (q) q.style.display = "";
        var b = ctx.qs("[data-book]"); if (b) b.style.display = "";
        return ctx.wait(350);
      }).then(function () {
        if (!ctx.alive()) return;
        showOutcome(ctx);
      });
      ctx.root.addEventListener("click", function (e) {
        var b = e.target.closest("[data-book]");
        if (!b) return;
        b.outerHTML = '<span class="dx-tag ok">' + I.check + "Meeting booked · Tue 11:00 AM</span>";
      });
    },
  };

  /* ---------- 02 · Support agent ---------- */
  DEMOS.support = {
    cat: "Customer Experience · Demo 02",
    title: "AI Customer Support",
    desc: "Resolve customer questions instantly with an AI agent connected to your business knowledge.",
    render: function () {
      return '<div class="dx-grid">' +
        '<div class="dx-panel"><span class="dx-label">' + I.sparkle + 'Support chat</span><div class="dx-chat" data-chat></div>' +
        '<div class="dx-btn-row"><button class="dx-btn ghost" data-next style="display:none">Resolve Another Issue ' + I.arrow + "</button></div></div>" +
        '<div class="dx-panel"><span class="dx-label">AI detected</span><div data-fields></div>' +
        '<div class="dx-kv on" style="border-bottom:0"><span>Confidence</span><b class="ok" data-conf>—</b></div>' +
        '<div style="margin-top:0.875rem" data-checks></div>' +
        "</div></div>" + outcomeBar("");
    },
    run: function (ctx, scenarioIdx) {
      var idx = scenarioIdx || 0;
      var s = DEMO_DATA.support.scenarios[idx];
      var chat = ctx.qs("[data-chat]");
      var fieldsEl = ctx.qs("[data-fields]");
      var checksEl = ctx.qs("[data-checks]");
      var nextBtn = ctx.qs("[data-next]");
      chat.innerHTML = ""; fieldsEl.innerHTML = kvRows(s.fields); checksEl.innerHTML = checkList(s.checks);
      var conf = ctx.qs("[data-conf]"); conf.textContent = "—";
      var outcome = ctx.qs("[data-outcome]");
      outcome.classList.remove("on");
      outcome.querySelector("span").innerHTML = s.outcome;
      if (nextBtn) nextBtn.style.display = "none";
      ctx.stage(0);
      playChat(ctx, chat, [{ who: "user", text: s.customer }], { user: "Customer", ai: "Support AI" })
        .then(function () { if (!ctx.alive()) return; ctx.stage(1); return ctx.wait(200); })
        .then(function () {
          if (!ctx.alive()) return;
          return playChat(ctx, chat, [{ who: "ai", text: s.ai }], { user: "Customer", ai: "Support AI" });
        })
        .then(function () { if (!ctx.alive()) return; ctx.stage(2); return showKvSequential(ctx, fieldsEl); })
        .then(function () { if (!ctx.alive()) return; return ctx.count(conf, s.confidence, { suffix: "%", dur: 800 }); })
        .then(function () { if (!ctx.alive()) return; return showChecksSequential(ctx, checksEl); })
        .then(function () {
          if (!ctx.alive()) return;
          showOutcome(ctx);
          if (nextBtn) nextBtn.style.display = "";
        });
      DEMOS.support._idx = idx;
      DEMOS.support._root = ctx.root;
      if (!ctx.root._supportWired) {
        ctx.root._supportWired = true;
        ctx.root.addEventListener("click", function (e) {
          if (!e.target.closest("[data-next]")) return;
          var next = (DEMOS.support._idx + 1) % DEMO_DATA.support.scenarios.length;
          DEMOS.support.run(makeCtx(DEMOS.support._root), next);
        });
      }
    },
  };

  /* ---------- 03 · Document intelligence ---------- */
  DEMOS.document = {
    cat: "Document Intelligence · Demo 03",
    title: "AI Document Intelligence",
    desc: "Turn contracts, invoices, reports, and PDFs into structured business intelligence.",
    render: function () {
      var d = DEMO_DATA.document;
      return '<div class="dx-grid">' +
        '<div><div class="dx-dropzone" data-drop><span class="dx-file-ico">PDF</span>' +
        '<div><div class="dx-file-name">' + d.file.name + '</div><div class="dx-file-meta">' + d.file.meta + "</div></div></div>" +
        '<div class="dx-btn-row"><button class="dx-btn" data-analyze>' + I.file + "Analyze Document</button></div>" +
        '<div style="margin-top:1rem;display:none" data-progress-wrap><div class="dx-progress"><i data-progress></i></div>' +
        '<p style="margin-top:0.5rem;font-size:0.75rem;color:var(--dk-mut)" data-status>Analyzing 47 data points…</p></div>' +
        '<div class="dx-panel" style="margin-top:1rem;display:none" data-summary-panel><span class="dx-label">AI summary</span>' +
        '<div class="dx-quote">&ldquo;' + d.summary + '&rdquo;</div>' +
        '<div class="dx-btn-row"><button class="dx-btn ghost" data-tab="summary">View Summary</button><button class="dx-btn ghost" data-tab="risks">View Risks</button></div></div></div>' +
        '<div class="dx-panel" style="display:none" data-analysis><span class="dx-label">Document analysis</span>' +
        kvRows(d.fields) +
        '<div class="dx-alert" style="display:none" data-alert>' + I.alert + "<span>3 clauses require attention</span></div>" +
        '<div style="display:none;margin-top:0.75rem" data-risks><span class="dx-label">Flagged clauses</span>' +
        d.risks.map(function (r) { return '<div class="dx-risk"><b>' + r.title + "</b><span>" + r.detail + "</span></div>"; }).join("") +
        "</div></div></div>" + outcomeBar(d.outcome);
    },
    run: function (ctx) {
      ctx.stage(0);
      ctx.root.addEventListener("click", function (e) {
        var analyze = e.target.closest("[data-analyze]");
        var tab = e.target.closest("[data-tab]");
        if (tab) {
          var risks = ctx.qs("[data-risks]");
          var showRisks = tab.getAttribute("data-tab") === "risks";
          if (risks) risks.style.display = showRisks ? "" : "none";
          return;
        }
        if (!analyze || analyze.disabled) return;
        analyze.disabled = true;
        analyze.innerHTML = "Analyzing…";
        var drop = ctx.qs("[data-drop]");
        drop.classList.add("dx-scanline");
        ctx.stage(1);
        var wrap = ctx.qs("[data-progress-wrap]"); wrap.style.display = "";
        var bar = ctx.qs("[data-progress]");
        var status = ctx.qs("[data-status]");
        var msgs = ["Reading document structure…", "Analyzing 47 data points…", "Extracting key terms…", "Scoring clause risk…"];
        var step = 0;
        (function advance() {
          if (!ctx.alive()) return;
          step++;
          bar.style.width = Math.min(step * 25, 100) + "%";
          status.textContent = msgs[Math.min(step - 1, msgs.length - 1)];
          if (step < 4) { setTimeout(advance, RM ? 40 : 620); return; }
          finish();
        })();
        function finish() {
          ctx.wait(400).then(function () {
            if (!ctx.alive()) return;
            drop.classList.remove("dx-scanline");
            wrap.style.display = "none";
            analyze.style.display = "none";
            ctx.stage(2);
            var panel = ctx.qs("[data-analysis]"); panel.style.display = "";
            return showKvSequential(ctx, panel);
          }).then(function () {
            if (!ctx.alive()) return;
            ctx.qs("[data-alert]").style.display = "";
            return ctx.wait(350);
          }).then(function () {
            if (!ctx.alive()) return;
            ctx.qs("[data-summary-panel]").style.display = "";
            showOutcome(ctx);
          });
        }
      });
    },
  };

  /* ---------- 04 · Voice agent ---------- */
  DEMOS.voice = {
    cat: "Voice AI · Demo 04",
    title: "AI Voice Agent",
    desc: "AI agents that handle real conversations, appointments, support calls, and qualification.",
    render: function () {
      var d = DEMO_DATA.voice;
      var bars = "";
      for (var i = 0; i < 36; i++) bars += "<span></span>";
      return '<div class="dx-grid">' +
        '<div class="dx-panel"><div class="dx-call-head"><span class="dx-call-live">AI Agent — Live Call</span><span class="dx-call-timer" data-timer>00:02:41</span></div>' +
        '<div class="dx-wave" data-wave>' + bars + "</div>" +
        '<div class="dx-transcript">' +
        d.lines.map(function (l) {
          return '<div class="dx-line ' + l.who + '"><span class="dx-spk">' + (l.who === "ai" ? "AI" : "Customer") + '</span><span class="dx-line-text"></span></div>';
        }).join("") + "</div></div>" +
        '<div><div class="dx-panel"><span class="dx-label">Call result</span>' + checkList(d.results) +
        '<div class="dx-btn-row"><button class="dx-btn" data-viewsummary style="display:none">' + I.phone + "View Call Summary</button></div></div>" +
        '<div class="dx-panel" style="margin-top:1rem;display:none" data-summarypanel><span class="dx-label">Call summary</span>' +
        '<p class="dx-reasoning">' + d.summary + "</p></div></div></div>" + outcomeBar(d.outcome);
    },
    run: function (ctx) {
      var d = DEMO_DATA.voice;
      var secs = d.startSeconds;
      var timerEl = ctx.qs("[data-timer]");
      var wave = ctx.qs("[data-wave]");
      var waveBars = ctx.qsa("[data-wave] span");
      var speaking = false;
      ctx.stage(0);
      // call timer
      (function tickTimer() {
        if (!ctx.alive()) return;
        secs++;
        var m = String(Math.floor(secs / 60)).padStart(2, "0");
        var s = String(secs % 60).padStart(2, "0");
        timerEl.textContent = "00:" + m + ":" + s;
        setTimeout(tickTimer, 1000);
      })();
      // waveform animation while "speaking"
      (function tickWave() {
        if (!ctx.alive()) return;
        if (!RM) {
          waveBars.forEach(function (b, i) {
            var base = speaking ? 20 + Math.random() * 70 : 12 + Math.random() * 10;
            var shape = 1 - Math.abs(i - waveBars.length / 2) / (waveBars.length / 1.4);
            b.style.height = Math.max(10, base * (0.5 + shape)) + "%";
          });
        }
        setTimeout(tickWave, 160);
      })();
      var lines = ctx.qsa(".dx-line");
      var p = Promise.resolve().then(function () { return ctx.wait(500); });
      d.lines.forEach(function (line, i) {
        p = p.then(function () {
          if (!ctx.alive()) return;
          if (i === 1) ctx.stage(1);
          speaking = true;
          lines[i].classList.add("on");
          return ctx.type(lines[i].querySelector(".dx-line-text"), line.text).then(function () {
            speaking = false;
            return ctx.wait(line.who === "ai" ? 550 : 750);
          });
        });
      });
      p.then(function () {
        if (!ctx.alive()) return;
        speaking = false;
        wave.classList.add("idle");
        ctx.stage(2);
        return showChecksSequential(ctx, ctx.root);
      }).then(function () {
        if (!ctx.alive()) return;
        ctx.qs("[data-viewsummary]").style.display = "";
        showOutcome(ctx);
      });
      ctx.root.addEventListener("click", function (e) {
        if (!e.target.closest("[data-viewsummary]")) return;
        ctx.qs("[data-summarypanel]").style.display = "";
        e.target.closest("[data-viewsummary]").style.display = "none";
      });
    },
  };

  /* ---------- 05 · Data analyst ---------- */
  DEMOS.analyst = {
    cat: "Business Intelligence · Demo 05",
    title: "AI Data Analyst",
    desc: "Ask questions about your business data and get instant insights.",
    render: function () {
      return '<div class="dx-query"><span class="dx-query-box">' + I.search + '<span data-q></span></span>' +
        '<button class="dx-btn" data-ask>' + I.sparkle + "Ask AI</button></div>" +
        '<div class="dx-grid" style="display:none" data-result>' +
        '<div class="dx-panel"><span class="dx-label" data-kpilabel>Revenue</span>' +
        '<div class="dx-kpi-big"><span class="from" data-from></span><span class="to" data-to>—</span><span class="delta" data-delta></span></div>' +
        '<svg class="dx-chart-svg" viewBox="0 0 320 150" data-chart></svg></div>' +
        '<div><div class="dx-panel"><span class="dx-label">Top reasons</span><ol class="dx-reasons" data-reasons></ol></div>' +
        '<div class="dx-panel" style="margin-top:1rem"><span class="dx-label">AI recommendation</span><div class="dx-quote" data-rec></div>' +
        '<div class="dx-btn-row"><button class="dx-btn ghost" data-again>Ask Another Question ' + I.arrow + "</button></div></div></div>" +
        "</div>" + outcomeBar("");
    },
    _buildChart: function (svgEl, series, drop) {
      var w = 320, h = 150, padX = 26, padTop = 14, padBot = 24;
      var min = Math.min.apply(null, series) * 0.94;
      var max = Math.max.apply(null, series) * 1.04;
      var months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
      function x(i) { return padX + (i * (w - padX - 10)) / (series.length - 1); }
      function y(v) { return padTop + (1 - (v - min) / (max - min)) * (h - padTop - padBot); }
      var pts = series.map(function (v, i) { return [x(i), y(v)]; });
      var line = "M" + pts.map(function (p) { return p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" L");
      var area = line + " L" + pts[pts.length - 1][0].toFixed(1) + " " + (h - padBot) + " L" + pts[0][0].toFixed(1) + " " + (h - padBot) + " Z";
      var grid = "";
      for (var g = 0; g < 3; g++) {
        var gy = padTop + (g * (h - padTop - padBot)) / 2;
        grid += '<line class="grid-line" x1="' + padX + '" y1="' + gy + '" x2="' + (w - 10) + '" y2="' + gy + '"/>';
      }
      var labels = months.map(function (m, i) { return '<text class="axis-label" x="' + x(i) + '" y="' + (h - 8) + '" text-anchor="middle">' + m + "</text>"; }).join("");
      var dots = pts.map(function (p, i) {
        var isLast = i === pts.length - 1;
        return '<circle class="rev-dot' + (isLast && drop ? " drop" : "") + '" cx="' + p[0] + '" cy="' + p[1] + '" r="' + (isLast ? 4 : 2.5) + '"/>';
      }).join("");
      svgEl.innerHTML = '<defs><linearGradient id="dxAreaGrad" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="hsl(243 85% 74%)" stop-opacity="0.28"/><stop offset="100%" stop-color="hsl(243 85% 74%)" stop-opacity="0"/></linearGradient></defs>' +
        grid + '<path class="rev-area" d="' + area + '"/><path class="rev-line" d="' + line + '"/>' + dots + labels;
      svgEl.classList.remove("play");
      void svgEl.getBoundingClientRect(); // restart CSS animations
      svgEl.classList.add("play");
    },
    run: function (ctx, qIdx) {
      var self = DEMOS.analyst;
      var idx = qIdx || 0;
      var d = DEMO_DATA.analyst.questions[idx];
      ctx.stage(0);
      var qEl = ctx.qs("[data-q]");
      var result = ctx.qs("[data-result]");
      result.style.display = "none";
      var outcome = ctx.qs("[data-outcome]");
      outcome.classList.remove("on");
      outcome.querySelector("span").innerHTML = d.outcome;
      ctx.type(qEl, d.q);
      function runAnswer() {
        ctx.stage(1);
        var ask = ctx.qs("[data-ask]");
        ask.disabled = true; ask.innerHTML = "Analyzing…";
        ctx.wait(RM ? 40 : 1100).then(function () {
          if (!ctx.alive()) return;
          ask.disabled = false; ask.innerHTML = I.sparkle + "Ask AI";
          ctx.stage(2);
          result.style.display = "";
          ctx.qs("[data-kpilabel]").textContent = d.kpiLabel;
          ctx.qs("[data-from]").textContent = d.from;
          var delta = ctx.qs("[data-delta]");
          delta.textContent = d.delta;
          delta.classList.toggle("up", d.deltaUp);
          var reasons = ctx.qs("[data-reasons]");
          reasons.innerHTML = d.reasons.map(function (r) { return "<li><span>" + r + "</span></li>"; }).join("");
          ctx.qs("[data-rec]").innerHTML = "&ldquo;" + d.rec + "&rdquo;";
          self._buildChart(ctx.qs("[data-chart]"), d.series, d.drop);
          return ctx.count(ctx.qs("[data-to]"), d.toNum, { prefix: d.prefix, suffix: d.suffix, decimals: 1, dur: 1000 });
        }).then(function () {
          if (!ctx.alive()) return;
          var items = ctx.qsa("[data-reasons] li");
          var p = Promise.resolve();
          items.forEach(function (li) {
            p = p.then(function () { if (!ctx.alive()) return; li.classList.add("on"); return ctx.wait(280); });
          });
          return p;
        }).then(function () {
          if (!ctx.alive()) return;
          showOutcome(ctx);
        });
      }
      self._idx = idx;
      self._root = ctx.root;
      self._runAnswer = runAnswer;
      if (!ctx.root._analystWired) {
        ctx.root._analystWired = true;
        ctx.root.addEventListener("click", function (e) {
          if (e.target.closest("[data-ask]")) { if (self._runAnswer) self._runAnswer(); return; }
          if (e.target.closest("[data-again]")) {
            var next = (self._idx + 1) % DEMO_DATA.analyst.questions.length;
            self.run(makeCtx(self._root), next);
          }
        });
      }
      // auto-run the first answer shortly after opening
      if (idx === 0) ctx.wait(RM ? 40 : 1300).then(function () { if (ctx.alive()) runAnswer(); });
      else runAnswer();
    },
  };

  /* ---------- 06 · Lead researcher ---------- */
  DEMOS.research = {
    cat: "Sales Intelligence · Demo 06",
    title: "AI Lead Researcher",
    desc: "Research companies, identify opportunities, and generate actionable sales intelligence.",
    render: function () {
      var d = DEMO_DATA.research;
      return '<div class="dx-query"><span class="dx-query-box">' + I.search + "<span>" + d.url + "</span></span>" +
        '<button class="dx-btn" data-research>Research Company</button></div>' +
        '<div class="dx-panel" style="display:none" data-steps-panel><span class="dx-label">AI research in progress</span>' +
        '<ul class="dx-steps">' + d.steps.map(function (s) { return '<li><span class="dx-step-ico"></span>' + s + "</li>"; }).join("") + "</ul></div>" +
        '<div class="dx-grid" style="display:none;margin-top:1.25rem" data-profile>' +
        '<div><div class="dx-panel"><span class="dx-label">Acme Inc.</span>' + kvRows(d.profile) + "</div>" +
        '<div class="dx-panel" style="margin-top:1rem"><span class="dx-label">Tech stack</span><div class="dx-tag-row">' +
        d.stack.map(function (t) { return '<span class="dx-tag">' + I.check + t + "</span>"; }).join("") + "</div>" +
        '<span class="dx-label" style="margin-top:1rem">Business signals</span><div class="dx-tag-row">' +
        d.signals.map(function (s) { return '<span class="dx-tag ' + s.cls + '">' + s.icon + " " + s.text + "</span>"; }).join("") + "</div></div></div>" +
        '<div><div class="dx-panel"><span class="dx-label">AI opportunity</span><div class="dx-quote">&ldquo;' + d.opportunity + '&rdquo;</div>' +
        '<div class="dx-kv on" style="margin-top:0.5rem"><span>Potential value</span><b class="ok">High</b></div>' +
        '<div class="dx-btn-row"><button class="dx-btn" data-outreach>' + I.mail + "Generate Outreach</button></div></div>" +
        '<div class="dx-panel" style="margin-top:1rem;display:none" data-email><span class="dx-label">Draft outreach</span>' +
        '<div class="dx-kv on"><span>To</span><b>' + d.email.to + "</b></div>" +
        '<div class="dx-kv on"><span>Subject</span><b>' + d.email.subject + "</b></div>" +
        '<p class="dx-reasoning" style="margin-top:0.6rem">' + d.email.body + "</p></div></div></div>" +
        outcomeBar(d.outcome);
    },
    run: function (ctx) {
      ctx.stage(0);
      ctx.root.addEventListener("click", function (e) {
        var res = e.target.closest("[data-research]");
        if (res && !res.disabled) {
          res.disabled = true; res.textContent = "Researching…";
          ctx.stage(1);
          var panel = ctx.qs("[data-steps-panel]");
          panel.style.display = "";
          var steps = ctx.qsa(".dx-steps li");
          var p = Promise.resolve();
          steps.forEach(function (li) {
            p = p.then(function () {
              if (!ctx.alive()) return;
              li.classList.add("run");
              return ctx.wait(RM ? 40 : 650).then(function () { li.classList.remove("run"); li.classList.add("ok"); });
            });
          });
          p.then(function () {
            if (!ctx.alive()) return;
            return ctx.wait(300);
          }).then(function () {
            if (!ctx.alive()) return;
            panel.style.display = "none";
            res.closest(".dx-query").style.display = "none";
            ctx.stage(2);
            var prof = ctx.qs("[data-profile]");
            prof.style.display = "";
            return showKvSequential(ctx, prof);
          }).then(function () {
            if (!ctx.alive()) return;
            showOutcome(ctx);
          });
          return;
        }
        var out = e.target.closest("[data-outreach]");
        if (out) {
          ctx.qs("[data-email]").style.display = "";
          out.style.display = "none";
        }
      });
    },
  };

  /* ---------- 07 · Workflow automation ---------- */
  DEMOS.workflow = {
    cat: "Process Automation · Demo 07",
    title: "AI Workflow Automation",
    desc: "Connect AI agents to your existing tools and automate repetitive business processes.",
    render: function () {
      var d = DEMO_DATA.workflow;
      var nodes = d.nodes.map(function (n, i) {
        return '<div class="wf-node" data-node="' + i + '"><span class="wf-node-ico">' + I[n.icon] + "</span>" +
          '<span><span class="wf-node-title">' + n.title + '</span><span class="wf-node-state" data-state>Waiting</span></span></div>' +
          (i < d.nodes.length - 1 ? '<span class="wf-link" data-link="' + i + '"></span>' : "");
      }).join("");
      return '<div class="wf-canvas"><div class="wf-track">' + nodes + "</div></div>" +
        '<div class="dx-btn-row"><button class="dx-btn" data-run>' + I.zap + 'Run Workflow</button><span class="dx-tag" data-progress-tag style="display:none">0/5 steps</span></div>' +
        '<div class="wf-summary" data-summary><div class="dx-panel"><span class="dx-label">Workflow completed</span>' +
        '<div class="wf-stats"><div class="wf-stat"><b>5/5</b><span>Steps completed</span></div><div class="wf-stat"><b>' + d.execTime + '</b><span>Execution time</span></div><div class="wf-stat"><b>0</b><span>Manual touches</span></div></div>' +
        checkList(d.checks) + "</div></div>" + outcomeBar(d.outcome);
    },
    run: function (ctx) {
      ctx.stage(0);
      ctx.root.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-run]");
        if (!btn || btn.disabled) return;
        btn.disabled = true; btn.innerHTML = "Running…";
        ctx.stage(1);
        var tag = ctx.qs("[data-progress-tag]");
        tag.style.display = "";
        var nodes = ctx.qsa(".wf-node");
        var links = ctx.qsa(".wf-link");
        var p = Promise.resolve();
        nodes.forEach(function (node, i) {
          p = p.then(function () {
            if (!ctx.alive()) return;
            node.classList.add("run");
            node.querySelector("[data-state]").textContent = "Running…";
            return ctx.wait(RM ? 40 : 850).then(function () {
              if (!ctx.alive()) return;
              node.classList.remove("run");
              node.classList.add("done");
              node.querySelector("[data-state]").textContent = "Completed";
              tag.textContent = (i + 1) + "/5 steps";
              if (i + 1 === 5) tag.classList.add("ok");
              if (links[i]) links[i].classList.add("on");
              return ctx.wait(200);
            });
          });
        });
        p.then(function () {
          if (!ctx.alive()) return;
          ctx.stage(2);
          var summary = ctx.qs("[data-summary]");
          summary.classList.add("on");
          btn.innerHTML = I.check + "Workflow Completed";
          return showChecksSequential(ctx, summary, 240);
        }).then(function () {
          if (!ctx.alive()) return;
          showOutcome(ctx);
        });
      });
    },
  };

  /* ---------- 08 · Recruiting agent ---------- */
  DEMOS.recruiting = {
    cat: "Talent Operations · Demo 08",
    title: "AI Recruiting Agent",
    desc: "Screen candidates, match skills, and surface the strongest applicants automatically.",
    render: function () {
      var d = DEMO_DATA.recruiting;
      return '<div class="dx-job"><div><h3>' + d.job + '</h3><span class="dx-job-meta">' + d.applications + ' applications · posted 6 days ago</span></div><span class="dx-tag">' + I.sparkle + "AI screening</span></div>" +
        '<div data-screening><div class="dx-progress"><i data-progress></i></div>' +
        '<p style="margin-top:0.5rem;font-size:0.75rem;color:var(--dk-mut)" data-status>Screening ' + d.applications + " applications…</p></div>" +
        '<div class="dx-grid" style="display:none;margin-top:1rem" data-results>' +
        '<div><span class="dx-label">Top matches</span><div class="dx-cand-list">' +
        d.candidates.map(function (c, i) {
          var initials = c.name.split(" ").map(function (w) { return w[0]; }).join("");
          return '<button type="button" class="dx-cand" data-cand="' + i + '"><span class="dx-avatar">' + initials + "</span>" +
            '<span class="dx-cand-info"><b>' + c.name + "</b><span>" + c.years + " · " + c.skills + "</span></span>" +
            '<span class="dx-match"><b>' + c.match + "%</b><span>Match</span></span></button>";
        }).join("") + "</div></div>" +
        '<div class="dx-panel"><span class="dx-label">AI reasoning</span><p class="dx-reasoning" data-reasoning>Select a candidate to see why the AI ranked them.</p>' +
        '<div class="dx-btn-row"><button class="dx-btn" data-view>View Candidate ' + I.arrow + "</button></div></div>" +
        "</div>" + outcomeBar(d.outcome);
    },
    run: function (ctx) {
      var d = DEMO_DATA.recruiting;
      ctx.stage(0);
      var bar = ctx.qs("[data-progress]");
      var status = ctx.qs("[data-status]");
      ctx.wait(300).then(function () {
        if (!ctx.alive()) return;
        ctx.stage(1);
        var pct = 0;
        return new Promise(function (res) {
          (function adv() {
            if (!ctx.alive()) return res();
            pct += RM ? 100 : 12 + Math.random() * 14;
            bar.style.width = Math.min(pct, 100) + "%";
            status.textContent = "Screening " + Math.min(Math.round((pct / 100) * d.applications), d.applications) + " of " + d.applications + " applications…";
            if (pct < 100) setTimeout(adv, 240); else res();
          })();
        });
      }).then(function () {
        if (!ctx.alive()) return;
        return ctx.wait(300);
      }).then(function () {
        if (!ctx.alive()) return;
        ctx.qs("[data-screening]").style.display = "none";
        ctx.stage(2);
        ctx.qs("[data-results]").style.display = "";
        var cands = ctx.qsa(".dx-cand");
        var p = Promise.resolve();
        cands.forEach(function (c) {
          p = p.then(function () { if (!ctx.alive()) return; c.classList.add("on"); return ctx.wait(240); });
        });
        return p;
      }).then(function () {
        if (!ctx.alive()) return;
        selectCand(0);
        showOutcome(ctx);
      });
      function selectCand(i) {
        ctx.qsa(".dx-cand").forEach(function (c, j) { c.classList.toggle("sel", i === j); });
        var r = ctx.qs("[data-reasoning]");
        if (r) r.textContent = "“" + d.candidates[i].reasoning + "”";
      }
      ctx.root.addEventListener("click", function (e) {
        var cand = e.target.closest("[data-cand]");
        if (cand) { selectCand(+cand.getAttribute("data-cand")); return; }
        var view = e.target.closest("[data-view]");
        if (view) view.outerHTML = '<span class="dx-tag ok">' + I.check + "Interview invite sent</span>";
      });
    },
  };

  /* ---------- wire up the cards ---------- */
  document.querySelectorAll(".demo-card").forEach(function (card) {
    var id = card.getAttribute("data-demo");
    card.addEventListener("click", function () { openDemo(id); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDemo(id); }
    });
  });
})();
