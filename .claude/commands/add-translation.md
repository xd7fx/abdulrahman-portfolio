أضف مفتاح ترجمة جديد إلى [contexts/LanguageContext.tsx](contexts/LanguageContext.tsx).

المعطيات: $ARGUMENTS

التنسيق المتوقع: `keyName | English text | النص العربي`
إذا لم يطابق هذا التنسيق فاطلب توضيحاً قبل التعديل.

القواعد الإلزامية:
1. **يجب** إضافة المفتاح في كلا القسمين `en` و `ar` في كائن `translations` — وإلا `t(key)` يرجّع الاسم نفسه fallback.
2. ضع المفتاح في القسم المنطقي الصحيح (Hero, About, Projects, Contact …) حسب التعليقات المقطعية الموجودة، لا تضيفه عشوائياً في النهاية.
3. تحقق أن المفتاح غير موجود مسبقاً قبل الإضافة (`Grep` على اسم المفتاح في الملف).
4. بعد التعديل شغّل `npm run type-check` للتأكد أن `keyof typeof translations.en` لازال يطابق.

أبلغ في النهاية برقمي السطرين اللذين أضفت إليهما (en و ar) كروابط `[LanguageContext.tsx:line](contexts/LanguageContext.tsx#Lline)`.
