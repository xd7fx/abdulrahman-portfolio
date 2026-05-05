# 🗺️ خارطة طريق Claude Code الشاملة (Roadmap)

> **الهدف من هذا الملف:** مرجع كامل ومفصّل لكل ما يخص Claude Code من الصفر. ارفعه لـ Claude عشان يفهم خلفيتك ومستواك ويساعدك بناءً على هذا.

---

## 📚 جدول المحتويات

1. [المفاهيم الأساسية](#1-المفاهيم-الأساسية)
2. [التثبيت والإعداد الأولي](#2-التثبيت-والإعداد-الأولي)
3. [بدء مشروع جديد](#3-بدء-مشروع-جديد)
4. [الدخول على مشروع موجود](#4-الدخول-على-مشروع-موجود)
5. [إعطاء Claude السياق (Context)](#5-إعطاء-claude-السياق-context)
6. [إجراء التعديلات (Making Changes)](#6-إجراء-التعديلات-making-changes)
7. [التحكم في السياق أثناء المحادثة](#7-التحكم-في-السياق-أثناء-المحادثة)
8. [الأوامر المخصصة (Custom Commands)](#8-الأوامر-المخصصة-custom-commands)
9. [المهارات (Skills)](#9-المهارات-skills)
10. [الوكلاء الفرعيون (Subagents)](#10-الوكلاء-الفرعيون-subagents)
11. [الخطافات (Hooks)](#11-الخطافات-hooks)
12. [خوادم MCP](#12-خوادم-mcp)
13. [تكامل GitHub](#13-تكامل-github)
14. [Claude Code SDK](#14-claude-code-sdk)
15. [مقارنة بين الميزات](#15-مقارنة-بين-الميزات)
16. [أفضل الممارسات](#16-أفضل-الممارسات)

---

## 1. المفاهيم الأساسية

### ما هو Claude Code؟
**Claude Code** هو أداة برمجة ذكية (agentic coding tool) تشتغل في الـ **Terminal** (سطر الأوامر) أو الـ IDE، وتفهم الكود، تنفذ الأوامر، وتسوي مهام التطوير كاملة بالأوامر الطبيعية (natural language).

### كيف يشتغل المساعد البرمجي (Coding Assistant)؟
لما تعطي Claude مهمة، يمر بثلاث خطوات مثل أي مطور بشري:

1. **Gather context** (جمع السياق) — يفهم وش المشكلة، أي الملفات متعلقة.
2. **Formulate a plan** (وضع خطة) — يقرر كيف يحل المشكلة.
3. **Take action** (تنفيذ) — يعدّل الملفات ويشغل الأوامر.

### Tool Use (استخدام الأدوات) — المفهوم الأهم
النماذج اللغوية (Language Models) أصلاً ما تقدر تقرأ ملفات أو تشغل أوامر. تقدر بس تولّد نصوص.

**Claude Code يحل هذا بـ Tool Use:**
- لما تسأل Claude يقرأ ملف، يضيف تعليمات داخلية تقوله: "لو تبي تقرأ ملف، رد بـ `ReadFile: اسم_الملف`"
- Claude يرد بهذا النص → Claude Code يشوفه → يقرأ الملف فعلياً → يرجع المحتوى لـ Claude.

**لماذا Claude قوي في Tool Use؟**
- يقدر يستخدم أدوات ما شافها قبل.
- قابل للتوسع — تقدر تضيف أدوات جديدة.
- أمان أفضل — ما يحتاج يرفع كودك كامل لخوادم خارجية.

---

## 2. التثبيت والإعداد الأولي

### تثبيت Claude Code

| نظام التشغيل | الأمر |
|--------------|-------|
| **macOS (Homebrew)** | `brew install --cask claude-code` |
| **macOS / Linux / WSL** | `curl -fsSL https://claude.ai/install.sh \| bash` |
| **Windows CMD** | `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd` |

### بعد التثبيت
1. افتح الـ Terminal.
2. اكتب `claude` — راح يطلب منك تسجيل دخول (authentication) أول مرة.
3. خلاص، جاهز.

### ملاحظات إضافية
- لو تستخدم **AWS Bedrock** أو **Google Cloud Vertex** في تحتاج إعدادات زيادة (راجع التوثيق الرسمي).
- لازم **Node.js** مثبّت على جهازك لو بتشتغل على مشاريع JavaScript/TypeScript.

---

## 3. بدء مشروع جديد

### الخطوات من الصفر:

#### الخطوة 1: جهّز مجلد المشروع
```bash
mkdir my-new-project
cd my-new-project
```

#### الخطوة 2: شغّل Claude Code داخل المجلد
```bash
claude
```

#### الخطوة 3: اطلب من Claude يبدأ
مثال:
```
اصنع لي مشروع React بسيط فيه صفحة Landing Page
```

#### الخطوة 4: أنشئ ملف CLAUDE.md
لما المشروع يبدأ يكبر، شغّل:
```
/init
```
هذا الأمر يخلي Claude يحلل الكود ويصنع ملف **CLAUDE.md** يحتوي على:
- وصف المشروع
- الأوامر المهمة
- الملفات الرئيسية
- أنماط الكود

---

## 4. الدخول على مشروع موجود

### إذا عندك مشروع جاهز:

#### الخطوة 1: ادخل مجلد المشروع
```bash
cd /path/to/your/project
claude
```

#### الخطوة 2: شغّل `/init`
هذا أهم خطوة! يحلل Claude الكود ويفهم:
- هيكل المشروع (architecture)
- الأوامر (commands)
- نمط الكتابة (coding patterns)

#### الخطوة 3: راجع ملف CLAUDE.md
بعد ما Claude يصنعه، افتحه وتأكد إنه فاهم مشروعك صح. عدّل عليه لو تبي.

---

## 5. إعطاء Claude السياق (Context)

### ملفات CLAUDE.md الثلاثة

| الملف | الموقع | الاستخدام |
|------|--------|-----------|
| `CLAUDE.md` | جذر المشروع | مشترك مع الفريق (git) |
| `CLAUDE.local.md` | جذر المشروع | تعليمات شخصية (ما تنشارك) |
| `~/.claude/CLAUDE.md` | مجلد المستخدم | لكل المشاريع على جهازك |

### إضافة ذكريات (Memories) بسرعة
استخدم الأمر `#` داخل Claude Code:
```
# استخدم التعليقات بشكل محدود فقط للكود المعقد
```
هذا يضيف التعليمة تلقائياً لـ CLAUDE.md.

### الإشارة للملفات بـ `@`
لما تبي Claude يشوف ملف معين:
```
كيف يشتغل نظام المصادقة؟ @auth
```
Claude يعرض لك قائمة ملفات تبدأ بـ "auth" وتختار اللي تبيه.

### الإشارة للملفات داخل CLAUDE.md
```markdown
مخطط قاعدة البيانات موجود في @prisma/schema.prisma
راجعه دائماً عند الحاجة لفهم هيكل البيانات.
```
هذا الملف يتحمّل تلقائياً في كل طلب.

---

## 6. إجراء التعديلات (Making Changes)

### استخدام لقطات الشاشة (Screenshots)
- على **Windows/Linux**: `Ctrl + V` لصق الصورة.
- على **macOS**: `Ctrl + V` (مو `Cmd+V`!)

مفيدة لما تبي تغيّر جزء معين من الواجهة.

### وضع التخطيط (Planning Mode)
**متى تستخدمه؟** لمهام معقدة تحتاج استكشاف الكود قبل التعديل.

**كيف تفعّله؟** اضغط `Shift + Tab` مرتين.

**وش يسوي؟**
- يقرأ ملفات كثيرة.
- يعمل خطة تفصيلية.
- يعرضها لك للموافقة قبل التنفيذ.

### أوضاع التفكير (Thinking Modes)
ترتيب من الأخف للأقوى:

| الكلمة المفتاحية | المستوى |
|-----------------|---------|
| `think` | تفكير أساسي |
| `think more` | تفكير موسّع |
| `think a lot` | تفكير شامل |
| `think longer` | وقت تفكير أطول |
| `ultrathink` | أقصى قدرة تفكير |

**مثال:**
```
ultrathink: حلّل لماذا هذا الـ function بطيء واقترح حل
```

### متى تستخدم أي وضع؟
- **Planning Mode**: لما المهمة تحتاج فهم واسع لعدة ملفات.
- **Thinking Mode**: لما المشكلة منطقية معقدة (debugging, algorithms).
- **الاثنين معاً**: للمهام اللي تحتاج عمق وعرض.

---

## 7. التحكم في السياق أثناء المحادثة

### مفاتيح ومختصرات مهمة

| المفتاح / الأمر | الوظيفة |
|----------------|---------|
| `Escape` | إيقاف Claude في منتصف الرد (لإعادة التوجيه) |
| `Escape` مرتين | الرجوع لرسالة سابقة (Rewind) |
| `#` | إضافة memory لملف CLAUDE.md |
| `@` | الإشارة لملف محدد |
| `/compact` | تلخيص المحادثة مع الاحتفاظ بالمعلومات المهمة |
| `/clear` | مسح المحادثة تماماً والبدء من جديد |

### متى تستخدم `/compact` vs `/clear`؟

- **`/compact`**: لما Claude فهم مشروعك وتبي تكمل بمهام مرتبطة.
- **`/clear`**: لما تبي تشتغل على مهمة مختلفة كلياً.

### مثال عملي:
```
# بدأت Claude على feature للمصادقة
# Claude فهم النظام، خلصت الـ feature
/compact  ← لتلخيص اللي صار والاحتفاظ بفهم النظام

# الآن تبي تشتغل على حاجة مختلفة (مثلاً تحسين الأداء)
/clear  ← ابدأ من جديد
```

---

## 8. الأوامر المخصصة (Custom Commands)

### ما هي؟
أوامر سريعة تبدأ بـ `/` تسوي مهام متكررة.

### كيف تصنع أمر مخصص؟

#### الخطوة 1: أنشئ المجلد
```
.claude/commands/
```

#### الخطوة 2: أنشئ ملف Markdown
مثلاً `audit.md`:
```markdown
شغّل الأوامر التالية بالترتيب:
1. npm audit
2. npm audit fix
3. npm test

وأخبرني بالنتائج.
```

#### الخطوة 3: أعد تشغيل Claude Code

#### الخطوة 4: استخدم الأمر
```
/audit
```

### أوامر بـ Arguments (معاملات)
استخدم `$ARGUMENTS`:

**ملف `write_tests.md`:**
```markdown
اكتب اختبارات شاملة لـ: $ARGUMENTS

القواعد:
- استخدم Vitest مع React Testing Library
- ضع الاختبارات في مجلد __tests__
- اختبر الحالات العادية والاستثنائية
```

**الاستخدام:**
```
/write_tests use-auth.ts داخل مجلد hooks
```

---

## 9. المهارات (Skills)

### ما هي Skills؟
مجلدات فيها تعليمات + ملفات تعلّم Claude كيف يسوي مهمة معينة بطريقة ثابتة.

**الفرق عن CLAUDE.md:**
- **CLAUDE.md**: يتحمّل في كل محادثة (دائم).
- **Skills**: تتحمّل عند الحاجة فقط (حسب الطلب).

### بنية Skill بسيط
```
.claude/skills/pr-description/
└── SKILL.md
```

### محتوى SKILL.md
```markdown
---
name: pr-description
description: يكتب وصف Pull Request. استخدمه عند إنشاء PR أو تلخيص تغييرات.
---

عند كتابة وصف PR:

1. شغّل `git diff main...HEAD` لترى التغييرات
2. استخدم القالب التالي:

## What
جملة واحدة تصف ما يفعله الـ PR.

## Why
السبب وراء هذا التغيير.

## Changes
- قائمة بالتغييرات
```

### الحقول الأساسية

| الحقل | إلزامي؟ | الوصف |
|------|---------|-------|
| `name` | ✅ | اسم الـ skill (أحرف صغيرة، شرطات) |
| `description` | ✅ | وصف يحدد متى يستخدمه Claude |
| `allowed-tools` | ❌ | تقييد الأدوات (Read, Grep, etc.) |
| `model` | ❌ | تحديد موديل معين (sonnet, opus, haiku) |

### أماكن حفظ Skills (ترتيب الأولوية)

1. **Enterprise** (أعلى أولوية)
2. **Personal** (`~/.claude/skills`) — لكل مشاريعك
3. **Project** (`.claude/skills`) — لهذا المشروع
4. **Plugins** (أقل أولوية)

### Progressive Disclosure (الكشف التدريجي)
لو الـ skill كبير، قسّمه:
```
.claude/skills/my-skill/
├── SKILL.md (أقل من 500 سطر)
├── scripts/
│   └── helper.sh
├── references/
│   └── details.md
└── assets/
    └── template.docx
```

Claude يقرأ SKILL.md أولاً، وبعدين يقرأ الملفات الإضافية لما يحتاجها.

### تقييد الأدوات (allowed-tools)
```yaml
---
name: code-reviewer
description: يراجع الكود فقط (قراءة).
allowed-tools: Read, Grep, Glob, Bash
---
```

### استكشاف أخطاء Skills

| المشكلة | الحل |
|--------|------|
| الـ skill ما يشتغل | حسّن الـ description وأضف كلمات مفتاحية |
| الـ skill ما يظهر | تأكد من اسم الملف `SKILL.md` (حساس للحروف) |
| Claude يستخدم skill غلط | اجعل الـ descriptions أكثر تميزاً |
| تعارض الأسماء | راجع ترتيب الأولوية وغيّر الاسم |

---

## 10. الوكلاء الفرعيون (Subagents)

### ما هم؟
مساعدون متخصصون، كل واحد يشتغل في **context window** خاصة فيه. يسلّم النتيجة النهائية فقط للمحادثة الرئيسية.

### لماذا يهمون؟
- يحافظون على نظافة الـ context الرئيسي.
- يركزون على مهمة واحدة.
- يمكن تشغيلهم بالتوازي.

### Subagents المدمجة
- **General purpose** — للمهام متعددة الخطوات
- **Explore** — للبحث السريع في الكود
- **Plan** — للتخطيط قبل التنفيذ

### إنشاء Subagent مخصص
```
/agents
```
ثم اختر "Create new agent" وأجب على الأسئلة.

### بنية ملف الـ Subagent
المسار: `.claude/agents/your-agent-name.md`

```markdown
---
name: code-quality-reviewer
description: مراجع جودة الكود. استخدمه بعد كتابة أو تعديل الكود.
tools: Bash, Glob, Grep, Read
model: sonnet
color: purple
---

أنت مراجع كود خبير. مهمتك:

1. راجع التغييرات الحديثة
2. ابحث عن مشاكل الجودة والأمان
3. قدّم التقرير بالشكل التالي:

## Summary
نظرة عامة.

## Critical Issues
مشاكل حرجة.

## Major Issues
مشاكل مهمة.

## Minor Issues
مشاكل بسيطة.

## Recommendations
توصيات.

## Obstacles Encountered
أي عوائق واجهتها.
```

### متى تستخدم Subagents؟
✅ **استخدمها لـ:**
- البحث والاستكشاف (Research)
- مراجعة الكود (Code Review)
- مهام تحتاج system prompt مخصص

❌ **تجنّبها لـ:**
- "Expert personas" بدون قيمة حقيقية
- Pipelines متتابعة (كل خطوة تعتمد على السابقة)
- تشغيل الاختبارات (تحتاج ترى الـ output كامل)

### قاعدة القرار
اسأل نفسك: **هل العمل الوسطي مهم؟**
- **لا** → استخدم Subagent
- **نعم** → اشتغل في الـ main thread

---

## 11. الخطافات (Hooks)

### ما هي Hooks؟
أوامر تشتغل تلقائياً **قبل** أو **بعد** استخدام Claude لأداة معينة.

### أنواع Hooks

| النوع | متى يشتغل |
|------|-----------|
| `PreToolUse` | قبل استخدام أداة (يقدر يمنع) |
| `PostToolUse` | بعد استخدام أداة |
| `Notification` | عند إشعار |
| `Stop` | عند انتهاء Claude |
| `SubagentStop` | عند انتهاء subagent |
| `PreCompact` | قبل عملية compact |
| `UserPromptSubmit` | عند إرسال المستخدم رسالة |
| `SessionStart` | بداية جلسة |
| `SessionEnd` | نهاية جلسة |

### إعداد Hook
في `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Grep",
        "hooks": [
          {
            "type": "command",
            "command": "node ./hooks/read_hook.js"
          }
        ]
      }
    ]
  }
}
```

### رموز الخروج (Exit Codes)
- `0` → كل شيء تمام، اسمح بالعملية
- `2` → امنع العملية (للـ PreToolUse فقط)

### مثال: منع قراءة ملف .env
```javascript
// hooks/read_hook.js
async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  
  const toolArgs = JSON.parse(Buffer.concat(chunks).toString());
  const readPath = toolArgs.tool_input?.file_path || "";
  
  if (readPath.includes('.env')) {
    console.error("ما يجوز قراءة ملف .env");
    process.exit(2);
  }
}
main();
```

### أمثلة Hooks مفيدة

**1. فحص TypeScript بعد التعديل:**
```json
{
  "PostToolUse": [{
    "matcher": "Edit|Write|MultiEdit",
    "hooks": [{
      "type": "command",
      "command": "tsc --noEmit"
    }]
  }]
}
```

**2. تشغيل الاختبارات عند تغيير ملفات معينة.**

**3. منع تعديل ملفات حساسة.**

### نصيحة لاكتشاف الخطاف (Helper Hook)
لو ما تعرف شكل الـ input:
```json
{
  "type": "command",
  "command": "jq . > post-log.json"
}
```
هذا يحفظ الـ input في ملف تقدر تراجعه.

### ⚠️ تحذير أمان
استخدم **absolute paths** في الـ hooks (مو relative) عشان تمنع هجمات سرقة المسار.

---

## 12. خوادم MCP

### ما هو MCP؟
**Model Context Protocol** — بروتوكول يسمح لـ Claude يستخدم أدوات إضافية زي متصفح، قاعدة بيانات، APIs.

### تشبيه
MCP مثل **USB-C للـ AI** — معيار موحّد لربط Claude بأي أداة.

### إضافة MCP Server (مثال: Playwright للتحكم بالمتصفح)
في الـ Terminal (خارج Claude Code):
```bash
claude mcp add playwright npx @playwright/mcp@latest
```

### الصلاحيات
في `.claude/settings.local.json`:
```json
{
  "permissions": {
    "allow": ["mcp__playwright"],
    "deny": []
  }
}
```
**ملاحظة:** شرطتين سفليتين `mcp__playwright`.

### أمثلة استخدام
- **Playwright** → تحكم بالمتصفح
- **قواعد بيانات** → استعلامات SQL
- **APIs** → اختبار endpoints
- **أدوات تطوير** → أتمتة

### مثال عملي: تحسين مولّد المكونات
```
افتح localhost:3000، ولّد مكوّن اختباري، راجع التصميم البصري،
وعدّل @src/lib/prompts/generation.tsx ليولّد مكونات أفضل.
```

---

## 13. تكامل GitHub

### التثبيت
داخل Claude:
```
/install-github-app
```

هذا الأمر:
1. يثبت Claude Code app على GitHub
2. يضيف API key
3. ينشئ PR تلقائي يضيف ملفات GitHub Actions

### Workflows المتوفرة

#### 1. Mention Action (@claude)
في أي issue أو PR، اذكر `@claude`:
- يحلل الطلب
- يصنع خطة
- ينفذها وينشر النتيجة

#### 2. Pull Request Action
لما تنشئ PR، Claude تلقائياً:
- يراجع التغييرات
- يحلل التأثير
- ينشر تقرير مفصل

### التخصيص
في ملف الـ workflow:

```yaml
- name: Project Setup
  run: |
    npm run setup
    npm run dev:daemon

# تعليمات مخصصة
custom_instructions: |
  المشروع معدّ، الخادم يشتغل على localhost:3000.
  السجلات في logs.txt.
  استخدم sqlite3 للاستعلامات.

# إعداد MCP
mcp_config: |
  {
    "mcpServers": {
      "playwright": {
        "command": "npx",
        "args": ["@playwright/mcp@latest"]
      }
    }
  }

# الأدوات المسموحة
allowed_tools: "Bash(npm:*),Bash(sqlite3:*),mcp__playwright__browser_snapshot"
```

### ⚠️ ملاحظة مهمة
في GitHub Actions، **لازم تذكر كل الأدوات صراحة** — ما فيه اختصار.

---

## 14. Claude Code SDK

### ما هو؟
يسمح لك تشغيل Claude Code **برمجياً** من داخل تطبيقاتك.

### المتوفر لـ:
- TypeScript
- Python
- CLI

### مثال TypeScript
```typescript
import { query } from "@anthropic-ai/claude-code";

const prompt = "ابحث عن استعلامات مكررة في ./src/queries";

for await (const message of query({ prompt })) {
  console.log(JSON.stringify(message, null, 2));
}
```

### الصلاحيات
افتراضياً **للقراءة فقط**. للتعديل:
```typescript
for await (const message of query({
  prompt,
  options: {
    allowedTools: ["Edit"]
  }
})) {
  // ...
}
```

### حالات الاستخدام
- **Git hooks** تراجع التغييرات تلقائياً
- **Build scripts** تحلل الكود
- **CI/CD pipelines** فحوصات جودة
- **توليد التوثيق** تلقائياً

---

## 15. مقارنة بين الميزات

### CLAUDE.md vs Skills vs Subagents vs Hooks vs MCP

| الميزة | متى تشتغل | الغرض |
|-------|-----------|-------|
| **CLAUDE.md** | كل محادثة | معايير دائمة للمشروع |
| **Skills** | عند الحاجة | خبرة محددة بمهمة |
| **Subagents** | عند التفويض | عزل سياق مهمة |
| **Hooks** | عند الأحداث | أتمتة قبل/بعد العمليات |
| **MCP** | عند الاستخدام | أدوات خارجية |

### متى تستخدم كل واحد؟

#### ✅ استخدم CLAUDE.md لـ:
- معايير المشروع الدائمة ("استخدم TypeScript strict")
- قيود عامة ("لا تعدّل schema")
- تفضيلات الكود العامة

#### ✅ استخدم Skills لـ:
- خبرة محددة بمهمة (PR review, brand guidelines)
- معرفة تحتاجها أحياناً فقط
- خطوات تفصيلية قد تزعج كل محادثة

#### ✅ استخدم Subagents لـ:
- البحث والاستكشاف
- مراجعات مستقلة
- مهام تحتاج system prompt مختلف

#### ✅ استخدم Hooks لـ:
- عمليات تشتغل بعد كل حفظ ملف
- تحقق قبل استدعاءات معينة
- آثار جانبية تلقائية

#### ✅ استخدم MCP لـ:
- ربط أدوات خارجية (متصفح، DB، APIs)

---

## 16. أفضل الممارسات

### 🎯 إدارة السياق (Context)
1. **ابدأ بـ `/init`** في كل مشروع جديد.
2. **حدّث CLAUDE.md** كلما تعلّم Claude شيء جديد.
3. **استخدم `/compact`** قبل ما تمتلئ المحادثة.
4. **استخدم `/clear`** عند الانتقال لمهمة مختلفة.

### 📝 كتابة الـ Prompts
1. **كن محدداً** — "صحح الباق" ❌ vs "صحح الباق في function login التي ترجع undefined" ✅
2. **استخدم `@`** للإشارة للملفات.
3. **فعّل Planning Mode** للمهام المعقدة.
4. **استخدم `ultrathink`** للمشاكل المنطقية الصعبة.

### 🛡️ الأمان
1. **استخدم absolute paths** في hooks.
2. **راجع skills** قبل التثبيت من مصادر خارجية.
3. **استخدم allowed-tools** لتقييد الصلاحيات.
4. **احمِ الملفات الحساسة** بـ hooks (مثل `.env`).

### 🚀 الكفاءة
1. **صنّف skills كلما لقيت نفسك تشرح نفس الشي.**
2. **أنشئ custom commands للمهام المتكررة.**
3. **استخدم Subagents للبحث** عشان ما يلوّث السياق.
4. **استخدم hooks للتحقق التلقائي** (tsc, tests, linting).

### 🔄 سير العمل (Workflow) المقترح

#### عند بدء مشروع جديد:
```
1. mkdir project && cd project
2. claude
3. اطلب بناء المشروع الأساسي
4. /init
5. راجع CLAUDE.md
6. أضف skills حسب الحاجة
7. أضف hooks للحماية
```

#### عند الاشتغال على feature:
```
1. افتح مشروعك: claude
2. اشرح المهمة بوضوح
3. استخدم Planning Mode إذا معقدة
4. راجع الخطة → عدّل → اعتمد
5. راقب التنفيذ
6. اختبر النتيجة
7. /compact للتلخيص
```

#### عند اكتشاف خطأ متكرر:
```
1. Escape لإيقاف Claude
2. # لإضافة memory بالحل الصحيح
3. كمّل المحادثة
```

---

## 🎓 الخلاصة

**Claude Code** أداة قوية لما تفهم طبقاتها:

1. **الطبقة الأساسية**: Claude + Tool Use
2. **طبقة السياق**: CLAUDE.md, @mentions, memories
3. **طبقة التخصيص**: Skills, Custom Commands
4. **طبقة الأتمتة**: Hooks, Subagents
5. **طبقة التوسع**: MCP, SDK, GitHub Integration

ابدأ بسيط، وأضف طبقات حسب الحاجة فقط.

---

## 📞 معلومات إضافية

- **التوثيق الرسمي**: https://code.claude.com/docs
- **دليل البدء**: https://code.claude.com/docs/en/quickstart
- **AWS Bedrock**: https://code.claude.com/docs/en/amazon-bedrock
- **Google Cloud Vertex**: https://code.claude.com/docs/en/google-vertex-ai

---

**تم إعداد هذا الـ Roadmap بناءً على كورس Anthropic الرسمي لـ Claude Code.**
