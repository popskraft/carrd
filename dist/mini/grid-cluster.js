(function() {
  const GRID_CLASSES = ['grid-2', 'grid-3', 'grid-4'];
  const GRID_SELECTOR = GRID_CLASSES.map(cls => `.${cls}`).join(',');

  const isGridBlock = element =>
    element && GRID_CLASSES.some(cls => element.classList && element.classList.contains(cls));

  const collected = new Set();
  const gridBlocks = document.querySelectorAll(GRID_SELECTOR);

  gridBlocks.forEach(block => {
    if (collected.has(block)) return;

    const cluster = [block];
    let sibling = block.nextElementSibling;

    while (isGridBlock(sibling)) {
      cluster.push(sibling);
      collected.add(sibling);
      sibling = sibling.nextElementSibling;
    }

    cluster.forEach(node => collected.add(node));
    wrapCluster(cluster);
  });

  function wrapCluster(cluster) {
    if (!cluster.length) return;

    const container = document.createElement('div');
    const dominantSize = cluster.reduce((max, el) => {
      const size = GRID_CLASSES.find(cls => el.classList.contains(cls));
      if (!size) return max;
      const numeric = parseInt(size.split('-')[1], 10);
      return Math.max(max, numeric);
    }, 1);

    const classList = ['custom-grid-container'];
    if (dominantSize >= 2) {
      classList.push(`grid-${dominantSize}`);
    }

    if (cluster.some(el => el.classList.contains('grid-sm-2'))) {
      classList.push('grid-sm-2');
    }

    container.className = classList.join(' ');
    cluster[0].parentNode.insertBefore(container, cluster[0]);
    cluster.forEach(node => container.appendChild(node));
  }

  document.querySelectorAll('.custom-grid-container .image-component > .frame').forEach(frame => {
    const computedWidth = window.getComputedStyle(frame).width;
    const widthInRem = parseFloat(computedWidth) / parseFloat(getComputedStyle(document.documentElement).fontSize);

    if (widthInRem > 20) {
      frame.classList.add('constrain-width');
    }
  });
})();