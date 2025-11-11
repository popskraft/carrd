// Группирует непрерывные блоки style-3 в grid-контейнеры (3 колонки, gap 1rem)
(function() {
  const items = document.querySelectorAll('.style-3');
  if (!items.length) return;

  let cluster = [];
  
  items.forEach((item, i) => {
    const nextItem = items[i + 1];
    cluster.push(item);
    
    // Проверяем, является ли следующий элемент соседним в DOM
    const isNextAdjacent = nextItem && item.nextElementSibling === nextItem;
    
    if (!isNextAdjacent || i === items.length - 1) {
      // Конец кластера — оборачиваем
      const container = document.createElement('div');
      container.className = 'custom-grid-container';
      cluster[0].parentNode.insertBefore(container, cluster[0]);
      cluster.forEach(el => container.appendChild(el));
      cluster = [];
    }
  });
})();
