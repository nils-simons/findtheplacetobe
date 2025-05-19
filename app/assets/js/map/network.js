function waitForFullNetworkIdle({ idleTime = 500, timeout = 10000 } = {}) {
  return new Promise((resolve, reject) => {
    let activeRequests = 0;
    let firstRequestTime = null;
    let lastRequestEndTime = null;
    let idleTimer = null;
    let timeoutTimer = null;

    function now() {
      return performance.now();
    }

    function resetIdleTimer() {
      if (idleTimer) clearTimeout(idleTimer);
      if (activeRequests === 0) {
        idleTimer = setTimeout(() => {
          cleanup();
          reportDuration();
          resolve();
        }, idleTime);
      }
    }

    function onRequestStart() {
      const currentTime = now();
      if (firstRequestTime === null) {
        firstRequestTime = currentTime;
      }
      activeRequests++;
      // console.log('Request started', activeRequests);
      if (idleTimer) clearTimeout(idleTimer);
    }

    function onRequestEnd() {
      const currentTime = now();
      activeRequests = Math.max(0, activeRequests - 1);
      lastRequestEndTime = currentTime;
      // console.log('Request ended', activeRequests);
      resetIdleTimer();
    }

    function reportDuration() {
      if (firstRequestTime !== null && lastRequestEndTime !== null) {
        const duration = lastRequestEndTime - firstRequestTime;
        console.log(`⏱️ Total network activity duration: ${duration.toFixed(2)} ms`);
      } else {
        console.log('No network requests were detected.');
      }
    }

    function cleanup() {
      if (observer) observer.disconnect();
      if (idleTimer) clearTimeout(idleTimer);
      if (timeoutTimer) clearTimeout(timeoutTimer);
    }

    // Observe all resource timing entries
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      for (const entry of entries) {
        if (entry.initiatorType === 'xmlhttprequest' || entry.initiatorType === 'fetch' || entry.initiatorType === 'img' || entry.initiatorType === 'script' || entry.initiatorType === 'css' || entry.initiatorType === 'link' || entry.initiatorType === 'other') {
          onRequestStart();

          // Simulate request end after its duration
          setTimeout(onRequestEnd, entry.duration);
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });

    // Safety timeout to avoid hanging
    timeoutTimer = setTimeout(() => {
      cleanup();
      reportDuration();
      reject(new Error('Timed out waiting for network idle'));
    }, timeout);

    // Trigger first idle check after window load
    if (document.readyState === 'complete') {
      resetIdleTimer();
    } else {
      window.addEventListener('load', () => {
        resetIdleTimer();
      });
    }
  });
}


function waitForSourceLoaded(map, sourceId) {
  return new Promise(resolve => {
    function check(e) {
      if (e.sourceId === sourceId && e.isSourceLoaded) {
        map.off('sourcedata', check);
        resolve();
      }
    }
    map.on('sourcedata', check);
  });
}


Promise.all([
  waitForSourceLoaded(map, 'flood-risk'),
  waitForFullNetworkIdle({ idleTime: 500, timeout: 60000 }),
]).then(() => {
  console.log('🎉 Map and flooding.geojson are fully loaded.');
  document.getElementById('loader').style.display = 'none';
});



// waitForFullNetworkIdle({ idleTime: 500, timeout: 15000 })
//   .then(async () => {
//     console.log('✅ All network requests (Mapbox too) finished.');
//     await new Promise(r => setTimeout(r, 2000));
//     document.getElementById('loader').style.display = 'none';
//   })
//   .catch(err => {
//     console.error(err.message);
//   });
