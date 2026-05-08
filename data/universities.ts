/**
 * AUTO-GENERATED from xlsx + preserved English names — do not edit `name`/`sector` by hand.
 *
 * Regenerate from the xlsx source in `archive/raw-data/` by running:
 *   npm run import:form-data
 *
 * `nameEn` values are preserved across re-imports: the script reads
 * existing `nameEn` strings from this file and re-applies them by Arabic
 * name. To override, add an `name_en` column to the xlsx OR edit this
 * file by hand (subsequent re-runs will keep the edit).
 *
 * Source rows: 93
 */
export type UniversitySector = "government" | "private" | "unknown";

export type University = {
  name: string;
  /** Official English name. Empty string when not yet translated. */
  nameEn: string;
  sector: UniversitySector;
};

export const universities: University[] = [
  { name: "الجامعة الإسلامية", nameEn: "Islamic University of Madinah", sector: "government" },
  { name: "الجامعة السعودية الإلكترونية", nameEn: "Saudi Electronic University", sector: "government" },
  { name: "جامعة الإمام عبدالرحمن بن فيصل", nameEn: "Imam Abdulrahman Bin Faisal University", sector: "government" },
  { name: "جامعة الإمام محمد بن سعود الاسلامية", nameEn: "Imam Mohammad Ibn Saud Islamic University", sector: "government" },
  { name: "جامعة الأمير سطام بن عبدالعزيز", nameEn: "Prince Sattam Bin Abdulaziz University", sector: "government" },
  { name: "جامعة الأميرة نورة بنت عبدالرحمن", nameEn: "Princess Nourah bint Abdulrahman University", sector: "government" },
  { name: "جامعة الباحة", nameEn: "Al-Baha University", sector: "government" },
  { name: "جامعة الجوف", nameEn: "Jouf University", sector: "government" },
  { name: "جامعة الحدود الشمالية", nameEn: "Northern Border University", sector: "government" },
  { name: "جامعة الطائف", nameEn: "Taif University", sector: "government" },
  { name: "جامعة القصيم", nameEn: "Qassim University", sector: "government" },
  { name: "جامعة المجمعة", nameEn: "Majmaah University", sector: "government" },
  { name: "جامعة الملك خالد", nameEn: "King Khalid University", sector: "government" },
  { name: "جامعة الملك سعود بن عبدالعزيز  للعلوم الصحية الدمام", nameEn: "King Saud bin Abdulaziz University for Health Sciences (Dammam)", sector: "government" },
  { name: "جامعة الملك سعود بن عبدالعزيز  للعلوم الصحية الرياض", nameEn: "King Saud bin Abdulaziz University for Health Sciences (Riyadh)", sector: "government" },
  { name: "جامعة الملك سعود بن عبدالعزيز  للعلوم الصحية جده", nameEn: "King Saud bin Abdulaziz University for Health Sciences (Jeddah)", sector: "government" },
  { name: "جامعة الملك عبدالعزيز", nameEn: "King Abdulaziz University", sector: "government" },
  { name: "جامعة الملك فيصل", nameEn: "King Faisal University", sector: "government" },
  { name: "جامعة أم القرى", nameEn: "Umm Al-Qura University", sector: "government" },
  { name: "جامعة بيشة", nameEn: "University of Bisha", sector: "government" },
  { name: "جامعة تبوك", nameEn: "University of Tabuk", sector: "government" },
  { name: "جامعة جازان", nameEn: "Jazan University", sector: "government" },
  { name: "جامعة جدة", nameEn: "University of Jeddah", sector: "government" },
  { name: "جامعة حائل", nameEn: "University of Ha'il", sector: "government" },
  { name: "جامعة حفر الباطن", nameEn: "University of Hafr Al Batin", sector: "government" },
  { name: "جامعة شقراء", nameEn: "Shaqra University", sector: "government" },
  { name: "جامعة طيبة", nameEn: "Taibah University", sector: "government" },
  { name: "جامعة نجران", nameEn: "Najran University", sector: "government" },
  { name: "الجامعة العربية المفتوحة", nameEn: "Arab Open University", sector: "private" },
  { name: "جامعة الأعمال والتكنولوجيا الأهلية", nameEn: "University of Business and Technology", sector: "private" },
  { name: "جامعة الأمير سلطان الأهلية", nameEn: "Prince Sultan University", sector: "private" },
  { name: "جامعة الأمير محمد بن فهد", nameEn: "Prince Mohammad Bin Fahd University", sector: "private" },
  { name: "جامعة الأمير مقرن بن عبدالعزيز", nameEn: "Prince Mugrin University", sector: "private" },
  { name: "جامعة الفيصل الأهلية", nameEn: "Alfaisal University", sector: "private" },
  { name: "جامعة المستقبل الأهلية", nameEn: "Future University", sector: "private" },
  { name: "جامعة المعرفة", nameEn: "Almaarefa University", sector: "private" },
  { name: "جامعة اليمامة الأهلية", nameEn: "Al Yamamah University", sector: "private" },
  { name: "جامعة دار الحكمة", nameEn: "Dar Al-Hekma University", sector: "private" },
  { name: "جامعة دار العلوم الأهلية", nameEn: "Dar Al Uloom University", sector: "private" },
  { name: "جامعة رياض العلم الأهلية", nameEn: "Riyadh Elm University", sector: "private" },
  { name: "جامعة سليمان الراجحي", nameEn: "Sulaiman Al Rajhi University", sector: "private" },
  { name: "جامعة عفت", nameEn: "Effat University", sector: "private" },
  { name: "جامعة فهد بن سلطان الأهلية", nameEn: "Fahad Bin Sultan University", sector: "private" },
  { name: "كلية ابن رشد للعلوم الإدارية الأهلية (أبها)", nameEn: "Ibn Rushd College for Management Sciences (Abha)", sector: "private" },
  { name: "كلية ابن سينا الأهلية للعلوم الطبية بجدة", nameEn: "Ibn Sina National College for Medical Sciences (Jeddah)", sector: "private" },
  { name: "كلية الأصالة الأهلية للأعمال بالدمام", nameEn: "Al-Asalah College for Business (Dammam)", sector: "private" },
  { name: "كلية الأصالة الأهلية للحقوق بالدمام", nameEn: "Al-Asalah College for Law (Dammam)", sector: "private" },
  { name: "كلية الأصالة الأهلية للعمارة والتصميم بالدمام", nameEn: "Al-Asalah College for Architecture and Design (Dammam)", sector: "private" },
  { name: "كلية الأصالة الأهلية للهندسة بالدمام", nameEn: "Al-Asalah College for Engineering (Dammam)", sector: "private" },
  { name: "كلية الأفق الاهلية للعلوم والتكنولوجيا بنجران", nameEn: "Al-Ufuq College for Science and Technology (Najran)", sector: "private" },
  { name: "كلية الأمير محمد بن سلمان للإدارة وريادة الأعمال", nameEn: "Prince Mohammed Bin Salman College of Business and Entrepreneurship", sector: "private" },
  { name: "كلية الأولى للحاسب الآلي ونظم المعلومات الأهلية", nameEn: "Al-Awwal College for Computer and Information Systems", sector: "private" },
  { name: "كلية الأولى للعلوم الإدارية والإنسانية الأهلية", nameEn: "Al-Awwal College for Management Sciences and Humanities", sector: "private" },
  { name: "كلية الأولى للهندسة الأهلية", nameEn: "Al-Awwal College for Engineering", sector: "private" },
  { name: "كلية الباحة الاهلية للعلوم", nameEn: "Al-Baha College of Science", sector: "private" },
  { name: "كلية البترجي الأهلية الطبية والتقنية (جدة)", nameEn: "Batterjee Medical College (Jeddah)", sector: "private" },
  { name: "كلية البترجي للعلوم الطبية والتكنولوجيا (الدمام)", nameEn: "Batterjee Medical College (Dammam)", sector: "private" },
  { name: "كلية البترجي للعلوم الطبية والتكنولوجيا (خميس مشيط)", nameEn: "Batterjee Medical College (Khamis Mushait)", sector: "private" },
  { name: "كلية الحقوق والعلوم الإسلامية (المدينة المنورة)", nameEn: "College of Law and Islamic Sciences (Madinah)", sector: "private" },
  { name: "كلية الخليج  للعلوم الإدارية و الإنسانية بحفر الباطن", nameEn: "Gulf College for Management Sciences and Humanities (Hafr Al-Batin)", sector: "private" },
  { name: "كلية الرؤية (الرياض)", nameEn: "Vision College (Riyadh)", sector: "private" },
  { name: "كلية الرؤية الطبية (جدة)", nameEn: "Vision Medical College (Jeddah)", sector: "private" },
  { name: "كلية الريادة للعلوم الصحية الأهلية بجدة", nameEn: "Riyadah College of Health Sciences (Jeddah)", sector: "private" },
  { name: "كلية الريان الاهلية للطب بالمدينة المنورة", nameEn: "Al-Rayan Medical College (Madinah)", sector: "private" },
  { name: "كلية الريان الاهلية للعلوم الصحية والتمريض بالمدينة المنورة", nameEn: "Al-Rayan College for Health Sciences and Nursing (Madinah)", sector: "private" },
  { name: "كلية الشرق العربي للحقوق الأهلية بالرياض", nameEn: "Arab East College for Law (Riyadh)", sector: "private" },
  { name: "كلية الشرق العربي للدراسات التطبيقية بالرياض", nameEn: "Arab East College for Applied Studies (Riyadh)", sector: "private" },
  { name: "كلية الشرق العربي للدراسات العليا الأهلية بالرياض", nameEn: "Arab East College for Graduate Studies (Riyadh)", sector: "private" },
  { name: "كلية الشمال للتمريض الاهلية بعرعر", nameEn: "Northern College of Nursing (Arar)", sector: "private" },
  { name: "كلية العناية الأهلية لنظم المعلومات الصحية بالرياض", nameEn: "Inaya College of Health Information Systems (Riyadh)", sector: "private" },
  { name: "كلية العناية لعلوم التمريض الأهلية بالرياض", nameEn: "Inaya College of Nursing Sciences (Riyadh)", sector: "private" },
  { name: "كلية الغد للعلوم الطبية التطبيقية الاهلية بابها", nameEn: "Al-Ghad International College for Applied Medical Sciences (Abha)", sector: "private" },
  { name: "كلية الغد للعلوم الطبية التطبيقية الاهلية بالدمام", nameEn: "Al-Ghad International College for Applied Medical Sciences (Dammam)", sector: "private" },
  { name: "كلية الغد للعلوم الطبية التطبيقية الاهلية بالمدينة المنورة", nameEn: "Al-Ghad International College for Applied Medical Sciences (Madinah)", sector: "private" },
  { name: "كلية الغد للعلوم الطبية التطبيقية الاهلية ببريدة", nameEn: "Al-Ghad International College for Applied Medical Sciences (Buraidah)", sector: "private" },
  { name: "كلية الغد للعلوم الطبية التطبيقية الاهلية بتبوك", nameEn: "Al-Ghad International College for Applied Medical Sciences (Tabuk)", sector: "private" },
  { name: "كلية الغد للعلوم الطبية التطبيقية الأهلية بجدة", nameEn: "Al-Ghad International College for Applied Medical Sciences (Jeddah)", sector: "private" },
  { name: "كلية الغد للعلوم الطبية التطبيقية الاهلية بنجران", nameEn: "Al-Ghad International College for Applied Medical Sciences (Najran)", sector: "private" },
  { name: "كلية الغد للعلوم الطبية التطبيقية بالرياض", nameEn: "Al-Ghad International College for Applied Medical Sciences (Riyadh)", sector: "private" },
  { name: "كلية الفيحاء الاهلية بالجبيل", nameEn: "Al-Faihaa College (Jubail)", sector: "private" },
  { name: "كلية الموسى الاهلية للعلوم الصحية بالهفوف", nameEn: "Mousa College for Health Sciences (Hofuf)", sector: "private" },
  { name: "كلية بريدة الأهلية لطب الأسنان والصيدلة (بريدة)", nameEn: "Buraidah Private Colleges — Dentistry and Pharmacy (Buraidah)", sector: "private" },
  { name: "كلية بريدة الأهلية للعلوم الإدارية والإنسانية (بريدة)", nameEn: "Buraidah Private Colleges — Management Sciences and Humanities (Buraidah)", sector: "private" },
  { name: "كلية بريدة الأهلية للعلوم الطبية التطبيقية (بريدة)", nameEn: "Buraidah Private Colleges — Applied Medical Sciences (Buraidah)", sector: "private" },
  { name: "كلية بريدة الأهلية للهندسة وتقنية المعلومات (بريدة)", nameEn: "Buraidah Private Colleges — Engineering and Information Technology (Buraidah)", sector: "private" },
  { name: "كلية جدة العالمية الأهلية (جدة)", nameEn: "Jeddah International College (Jeddah)", sector: "private" },
  { name: "كلية سعد للتمريض والعلوم الصحية", nameEn: "Saad College of Nursing and Allied Health Sciences", sector: "private" },
  { name: "كلية عنيزة الاهلية للدراسات الانسانية والإدارية بعنيزة", nameEn: "Unaizah Private College for Humanities and Management Studies (Unaizah)", sector: "private" },
  { name: "كلية عنيزة الأهلية للهندسة وتقنية المعلومات بعنيزة", nameEn: "Unaizah Private College for Engineering and Information Technology (Unaizah)", sector: "private" },
  { name: "كلية فقيه الأهلية للعلوم الطبية بجدة", nameEn: "Fakeeh College for Medical Sciences (Jeddah)", sector: "private" },
  { name: "كلية كابسارك للسياسات العامة الاهلية بالرياض", nameEn: "KAPSARC College of Public Policy (Riyadh)", sector: "private" },
  { name: "كلية محمد المانع الاهلية للعلوم الطبية بالخبر", nameEn: "Mohammed Al-Mana College for Medical Sciences (Khobar)", sector: "private" },
  { name: "كلية مكة الأهلية بمكة المكرمة", nameEn: "Makkah Private College (Makkah)", sector: "private" },
];
