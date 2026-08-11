// Категории специализаций Вакадара.
// Каждая категория несёт:
//  - id: слаг для URL и фильтров
//  - label: отображаемое имя
//  - icon: эмодзи для карточки
//  - query: текстовый запрос к HH API (поле text)
//  - keywords: слова для ранжирования релевантности и фильтрации демо-датасета
//  - roleIds: (опц.) professional_role id из справочника HH для сужения выдачи

export const CATEGORIES = [
  {
    id: 'backend',
    label: 'Backend',
    icon: '🛠️',
    query: 'Backend разработчик (Python OR Java OR Go OR Node OR PHP)',
    keywords: ['backend', 'бэкенд', 'python', 'java', 'golang', 'go', 'node', 'php', 'django', 'spring', 'api'],
    roleIds: ['96'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '🎨',
    query: 'Frontend разработчик (React OR Vue OR Angular OR TypeScript)',
    keywords: ['frontend', 'фронтенд', 'react', 'vue', 'angular', 'typescript', 'javascript', 'верстка'],
    roleIds: ['96'],
  },
  {
    id: 'fullstack',
    label: 'Fullstack',
    icon: '🧩',
    query: 'Fullstack разработчик',
    keywords: ['fullstack', 'фулстек', 'full stack', 'react', 'node', 'nest'],
    roleIds: ['96'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: '📱',
    query: 'Мобильный разработчик (iOS OR Android OR Flutter OR React Native)',
    keywords: ['mobile', 'мобильный', 'ios', 'android', 'swift', 'kotlin', 'flutter', 'react native'],
    roleIds: ['96'],
  },
  {
    id: 'devops',
    label: 'DevOps / SRE',
    icon: '⚙️',
    query: 'DevOps OR SRE OR инженер инфраструктуры (Kubernetes OR Docker)',
    keywords: ['devops', 'sre', 'kubernetes', 'k8s', 'docker', 'ci/cd', 'terraform', 'ansible', 'инфраструктур'],
    roleIds: ['160'],
  },
  {
    id: 'qa',
    label: 'QA / Тестирование',
    icon: '🧪',
    query: 'QA инженер OR тестировщик (Automation OR Manual)',
    keywords: ['qa', 'тест', 'тестировщик', 'автотест', 'automation', 'selenium', 'playwright'],
    roleIds: ['124'],
  },
  {
    id: 'data-ml',
    label: 'Data / ML / AI',
    icon: '🤖',
    query: 'Data Scientist OR ML инженер OR машинное обучение',
    keywords: ['ml', 'machine learning', 'машинное обучение', 'data scientist', 'нейросет', 'ai', 'llm', 'pytorch', 'nlp'],
    roleIds: ['165', '96'],
  },
  {
    id: 'analytics',
    label: 'Аналитика / BI',
    icon: '📊',
    query: 'Аналитик данных OR BI аналитик OR системный аналитик',
    keywords: ['аналитик', 'analyst', 'bi', 'sql', 'tableau', 'power bi', 'системный аналитик'],
    roleIds: ['156', '10'],
  },
  {
    id: 'design',
    label: 'Design (UI/UX)',
    icon: '✏️',
    query: 'UX/UI дизайнер OR продуктовый дизайнер',
    keywords: ['дизайн', 'design', 'ui', 'ux', 'figma', 'продуктовый дизайнер', 'designer'],
    roleIds: ['34'],
  },
  {
    id: 'product',
    label: 'Product / Project',
    icon: '🎯',
    query: 'Product Manager OR Project Manager OR продакт',
    keywords: ['product', 'project', 'продакт', 'проджект', 'менеджер продукта', 'owner', 'scrum'],
    roleIds: ['73'],
  },
  {
    id: 'management',
    label: 'Менеджмент / Lead',
    icon: '👥',
    query: 'Team Lead OR Head of OR технический руководитель',
    keywords: ['lead', 'тимлид', 'head', 'руководитель', 'cto', 'директор'],
    roleIds: ['36'],
  },
  {
    id: 'security',
    label: 'Security',
    icon: '🛡️',
    query: 'Информационная безопасность OR специалист по ИБ OR security',
    keywords: ['security', 'безопасность', 'иб', 'pentest', 'soc', 'appsec', 'кибербез'],
    roleIds: ['160'],
  },
];

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

export function getCategory(id) {
  return CATEGORY_BY_ID[id] || null;
}
