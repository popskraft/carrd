// Grid Cluster: wrap consecutive `.grid-*` containers into one responsive grid and honor any `w-XX` width helpers.
(function() {
  const GRID_CLASSES = ['grid-2', 'grid-3', 'grid-4', 'grid-5', 'grid-6'];
  const WIDTH_CLASS_MAP = {
    'w-20': '20%',
    'w-25': '25%',
    'w-30': '33%',
    'w-40': '40%',
    'w-50': '50%',
    'w-60': '60%',
    'w-70': '67%',
    'w-75': '75%',
    'w-80': '80%',
  };
  const GRID_SELECTOR = GRID_CLASSES.map(cls => `.${cls}`).join(',');
  const WIDTH_CLASSES = Object.keys(WIDTH_CLASS_MAP);

  const isGridBlock = element =>
    element && GRID_CLASSES.some(cls => element.classList && element.classList.contains(cls));

  const getGridSize = element => {
    if (!element || !element.classList) return null;
    const sizeClass = GRID_CLASSES.find(cls => element.classList.contains(cls));
    if (!sizeClass) return null;
    const numeric = parseInt(sizeClass.split('-')[1], 10);
    return Number.isNaN(numeric) ? null : numeric;
  };

  const widthValueForElement = element => {
    if (!element || !element.classList) return null;
    const widthClass = WIDTH_CLASSES.find(cls => element.classList.contains(cls));
    return widthClass ? WIDTH_CLASS_MAP[widthClass] : null;
  };

  const collected = new Set();
  const gridBlocks = document.querySelectorAll(GRID_SELECTOR);

  gridBlocks.forEach(block => {
    if (collected.has(block)) return;

    const cluster = [block];
    const baseSize = getGridSize(block);
    let sibling = block.nextElementSibling;

    while (isGridBlock(sibling)) {
      const siblingSize = getGridSize(sibling);
      if (baseSize !== null && siblingSize !== baseSize) {
        break;
      }
      cluster.push(sibling);
      collected.add(sibling);
      sibling = sibling.nextElementSibling;
    }

    collected.add(block);
    wrapCluster(cluster, baseSize);
  });

  function wrapCluster(cluster, gridSize) {
    if (!cluster.length || !cluster[0].parentNode) return;

    const container = document.createElement('div');
    const classList = ['custom-grid-container'];
    
    if (gridSize && gridSize >= 2) {
      classList.push(`grid-${gridSize}`);
    }

    if (cluster.some(el => el.classList.contains('grid-sm-2'))) {
      classList.push('grid-sm-2');
    }

    container.className = classList.join(' ');
    cluster[0].parentNode.insertBefore(container, cluster[0]);
    cluster.forEach(node => container.appendChild(node));
    applyDesktopWidths(container, cluster, gridSize);
  }

  document.querySelectorAll('.custom-grid-container .image-component > .frame').forEach(frame => {
    const computedWidth = window.getComputedStyle(frame).width;
    const widthInRem = parseFloat(computedWidth) / parseFloat(getComputedStyle(document.documentElement).fontSize);

    if (widthInRem > 20) {
      frame.classList.add('constrain-width');
    }
  });

  function applyDesktopWidths(container, cluster, gridSize) {
    if (!gridSize || gridSize < 2 || cluster.length < gridSize) return;

    const initialRow = cluster.slice(0, gridSize);
    const columnWidths = initialRow.map(widthValueForElement);
    if (!columnWidths.some(Boolean)) return;

    const templateParts = columnWidths.map(value => value || 'minmax(0, 1fr)');
    container.classList.add('custom-grid-container--desktop-widths');
    container.style.setProperty('--custom-desktop-template', templateParts.join(' '));
  }
})();
