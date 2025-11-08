// Масив лабораторних робіт
const labs = [
  { number: 1, status: "Доступна", title: "Структура HTML-документа", description: "Основні теги, таблиці, зображення, списки, форми. Робота з GitHub." },
  { number: 2, status: "Доступна", title: "Оформлення текстових елементів в HTML-документах", description: "Каскадні таблиці стилів, типи селекторів та ідентифікатори." },
  { number: 3, status: "Доступна", title: "Адаптація верстки сторінки", description: "Блокова верстка. Верстка засобами CSS та Flexbox. Адаптивна верстка. Медія-запити. Метатег viewport." },
  { number: 4, status: "Доступна", title: "Основи JAVASCRIPT у HTML-документі", description: "Шаблонні рядки. Керування порядком обчислень. Масиви. Методи масивів. Функції." },
  { number: 5, status: "Скоро", title: "Скоро", description: "Теги" },
  { number: 6, status: "Скоро", title: "Скоро", description: "Теги" },
  { number: 7, status: "Скоро", title: "Скоро", description: "Теги" },
  { number: 8, status: "Скоро", title: "Скоро", description: "Теги" },
  { number: 9, status: "Скоро", title: "Скоро", description: "Теги" }
];

// Функція для створення карток
function renderLabCards(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = labs.map(lab => {
    const statusColor = lab.status === "Доступна" ? "bg-[#497b50]" : "bg-[#eab308]";
    const cardBg = lab.status === "Доступна" ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-400";
    const button = lab.status === "Доступна" 
      ? `<a href="./lab${lab.number}/lab${lab.number}.html" class="block w-full text-center ${cardBg} text-white font-semibold py-2 px-4 rounded transition-colors">Переглянути роботу</a>`
      : `<button disabled class="w-full bg-gray-300 text-gray-500 font-semibold py-2 px-4 rounded cursor-not-allowed">У розробці</button>`;

    return `
      <div class="lab-card bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${lab.status !== "Доступна" ? "opacity-60" : ""}">
        <div class="${cardBg} text-white p-4">
          <div class="flex items-center justify-between">
            <span class="text-3xl font-bold">№${lab.number}</span>
            <span class="${statusColor} text-xs px-3 py-1 rounded-full">${lab.status}</span>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2 text-gray-800">${lab.title}</h3>
          <p class="text-gray-600 mb-4">${lab.description}</p>
          <div class="space-y-2">${button}</div>
        </div>
      </div>
    `;
  }).join("");
}
