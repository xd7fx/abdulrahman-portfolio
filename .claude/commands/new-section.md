أنشئ قسم (section) جديد للصفحة الرئيسية يتبع الأنماط القائمة في المشروع.

اسم القسم ووصفه: $ARGUMENTS

اتبع هذه الخطوات بدقة:

1. **اقرأ** [components/About.tsx](components/About.tsx) أو [components/Projects.tsx](components/Projects.tsx) كنموذج مرجعي للهيكلة المعتمدة.

2. **أنشئ** ملفاً جديداً في `components/<Name>.tsx`:
   - يبدأ بـ `"use client"` (ضروري لأن `useLanguage` و Framer Motion كلاهما client-side).
   - يستخدم `SectionPlanet` و `SectionHeader` من نفس المجلد بدل إعادة بناء chrome القسم.
   - يحترم `prefers-reduced-motion` لأي حركة ثقيلة.
   - يستهلك `useLanguage()` ويستخدم `t("key")` لكل النصوص — لا تضع نصوصاً مكتوبة inline.
   - استخدم tokens الألوان `space-*` فقط من [tailwind.config.ts](tailwind.config.ts) ولا تخترع ألواناً جديدة.

3. **أضف** كل مفاتيح النصوص في [contexts/LanguageContext.tsx](contexts/LanguageContext.tsx) — في قسمي `en` و `ar` معاً.

4. **سجّل** القسم في [app/page.tsx](app/page.tsx) داخل الـ `<div className="relative z-[1]">` بالترتيب المنطقي الصحيح.

5. **أعطِ** `<section id="...">` معرّفاً ثابتاً يطابق المفاتيح التي يستخدمها `Navigation` و `PlanetaryNavigation` في `IntersectionObserver`. لا تغيّر `id`s الموجودة في الأقسام الأخرى.

6. شغّل `npm run type-check` للتأكد، ثم أبلغ بالملفات الجديدة/المعدّلة كروابط markdown.
