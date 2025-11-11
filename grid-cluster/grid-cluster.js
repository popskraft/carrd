// Groups consecutive style-3 blocks into grid containers (3 columns, 1rem gap)
(function() {
  const items = document.querySelectorAll('.style-3');
  if (!items.length) return;

  let cluster = [];
  
  items.forEach((item, i) => {
    const nextItem = items[i + 1];
    cluster.push(item);
    
    // Check if next element is adjacent in DOM
    const isNextAdjacent = nextItem && item.nextElementSibling === nextItem;
    
    if (!isNextAdjacent || i === items.length - 1) {
      // End of cluster — wrap it
      const container = document.createElement('div');
      container.className = 'custom-grid-container';
      cluster[0].parentNode.insertBefore(container, cluster[0]);
      cluster.forEach(el => container.appendChild(el));
      cluster = [];
    }
  });
})();
