document.addEventListener('DOMContentLoaded', function () {

  var dialogs = document.querySelectorAll('dialog');

  dialogs.forEach(function (dialog) {
    var closeBtn = dialog.querySelector('button');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        dialog.close();
      });
    }

    dialog.addEventListener('click', function (e) {
      var rect = dialog.getBoundingClientRect();
      var isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      dialogs.forEach(function (dialog) {
        if (dialog.open) {
          dialog.close();
        }
      });
    }
  });

  var triggers = document.querySelectorAll('[data-dialog]');
  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = trigger.getAttribute('data-dialog');
      var target = document.getElementById(targetId);
      if (target && target.tagName === 'DIALOG') {
        if (target.open) {
          target.close();
        } else {
          target.showModal();
        }
      }
    });
  });

  var buttons = document.querySelectorAll('button, input[type="submit"], input[type="reset"]');

  buttons.forEach(function (button) {
    button.addEventListener('mousedown', function () {
      button.style.transform = 'scale(0.97)';
    });

    button.addEventListener('mouseup', function () {
      button.style.transform = 'scale(1)';
    });

    button.addEventListener('mouseleave', function () {
      button.style.transform = 'scale(1)';
    });

    button.addEventListener('click', function (e) {
      if (button.type === 'reset') {
        return;
      }

      if (button.type === 'submit') {
        return;
      }

      if (button.hasAttribute('data-dialog')) {
        return;
      }

      var existing = button.querySelector('.click-feedback');
      if (existing) {
        existing.remove();
      }

      var feedback = document.createElement('span');
      feedback.className = 'click-feedback';
      feedback.textContent = ' ✓';
      feedback.style.fontSize = '0.8em';
      feedback.style.opacity = '0';
      feedback.style.transition = 'opacity 0.2s ease';
      button.appendChild(feedback);

      requestAnimationFrame(function () {
        feedback.style.opacity = '1';
      });

      setTimeout(function () {
        feedback.style.opacity = '0';
        setTimeout(function () {
          if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
          }
        }, 200);
      }, 800);
    });
  });

  var details = document.querySelectorAll('details');
  details.forEach(function (detail) {
    var summary = detail.querySelector('summary');
    if (!summary) {
      return;
    }

    summary.addEventListener('click', function () {
      details.forEach(function (other) {
        if (other !== detail && other.open) {
          other.open = false;
        }
      });
    });
  });

  var anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (href === '#' || href === '#!') {
        e.preventDefault();
        return;
      }
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  var navLinks = document.querySelectorAll('header nav a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (other) {
        other.removeAttribute('aria-current');
      });
      link.setAttribute('aria-current', 'page');
    });
  });

  var forms = document.querySelectorAll('form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('input[type="submit"], button[type="submit"], button:not([type])');
      if (submitBtn) {
        var originalText = submitBtn.textContent || submitBtn.value || 'Submit';

        if (submitBtn.tagName === 'INPUT') {
          submitBtn.value = 'Sending…';
        } else {
          submitBtn.textContent = 'Sending…';
        }

        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';

        setTimeout(function () {
          if (submitBtn.tagName === 'INPUT') {
            submitBtn.value = originalText;
          } else {
            submitBtn.textContent = originalText;
          }
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';

          var status = document.createElement('span');
          status.textContent = ' ✓ Sent';
          status.style.marginLeft = '0.75rem';
          status.style.fontWeight = '600';
          status.style.color = 'var(--text)';
          submitBtn.parentNode.appendChild(status);

          setTimeout(function () {
            if (status.parentNode) {
              status.parentNode.removeChild(status);
            }
          }, 2000);
        }, 1200);
      }
    });
  });

  var copyTargets = document.querySelectorAll('pre code');
  copyTargets.forEach(function (block) {
    block.style.position = 'relative';
    block.style.cursor = 'pointer';
    block.title = 'Click to copy';

    block.addEventListener('click', function () {
      var text = block.textContent;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          showCopyFeedback(block);
        });
      } else {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showCopyFeedback(block);
        } catch (err) {
          console.warn('Copy failed');
        }
        document.body.removeChild(textarea);
      }
    });
  });

  function showCopyFeedback(el) {
    var feedback = el.querySelector('.copy-feedback');
    if (feedback) {
      feedback.remove();
    }

    var note = document.createElement('span');
    note.className = 'copy-feedback';
    note.textContent = 'Copied!';
    note.style.position = 'absolute';
    note.style.top = '0.5rem';
    note.style.right = '0.5rem';
    note.style.padding = '0.2rem 0.75rem';
    note.style.backgroundColor = 'var(--black)';
    note.style.color = 'var(--white)';
    note.style.fontSize = '0.75rem';
    note.style.borderRadius = 'var(--radius-pill)';
    note.style.pointerEvents = 'none';
    note.style.opacity = '0';
    note.style.transition = 'opacity 0.2s ease';

    el.appendChild(note);

    requestAnimationFrame(function () {
      note.style.opacity = '1';
    });

    setTimeout(function () {
      note.style.opacity = '0';
      setTimeout(function () {
        if (note.parentNode) {
          note.parentNode.removeChild(note);
        }
      }, 200);
    }, 1200);
  }

  var progressBars = document.querySelectorAll('progress');
  progressBars.forEach(function (bar) {
    var target = parseFloat(bar.getAttribute('value')) || 0;
    var max = parseFloat(bar.getAttribute('max')) || 100;
    bar.setAttribute('value', '0');

    var current = 0;
    var step = target / 30;

    var interval = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      bar.setAttribute('value', current);
    }, 16);
  });

  var meters = document.querySelectorAll('meter');
  meters.forEach(function (meter) {
    var target = parseFloat(meter.getAttribute('value')) || 0;
    meter.setAttribute('value', '0');

    var current = 0;
    var step = target / 30;

    var interval = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      meter.setAttribute('value', current);
    }, 16);
  });

  var toggleGroups = document.querySelectorAll('[data-toggle-group]');
  toggleGroups.forEach(function (group) {
    var buttons = group.querySelectorAll('[data-toggle]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isPressed = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', isPressed ? 'false' : 'true');
      });
    });
  });

  var tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var tablist = tab.closest('[role="tablist"]');
      if (!tablist) {
        return;
      }

      var allTabs = tablist.querySelectorAll('[role="tab"]');
      allTabs.forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');

      var panelId = tab.getAttribute('aria-controls');
      if (panelId) {
        var panels = document.querySelectorAll('[role="tabpanel"]');
        panels.forEach(function (p) {
          p.hidden = true;
        });
        var targetPanel = document.getElementById(panelId);
        if (targetPanel) {
          targetPanel.hidden = false;
        }
      }
    });
  });

  var externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach(function (link) {
    if (link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  var imagePlaceholders = document.querySelectorAll('img:not([src]), img[src=""]');
  imagePlaceholders.forEach(function (img) {
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"%3E%3Crect width="400" height="200" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="14" fill="%23888888" text-anchor="middle" dy=".3em"%3ENo image%3C/text%3E%3C/svg%3E';
  });

  var headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach(function (heading) {
    heading.addEventListener('dblclick', function () {
      var range = document.createRange();
      range.selectNodeContents(heading);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    });
  });

});
(function footerStyler() {

  function styleFooter(footer) {
    if (footer.dataset.styled === 'true') {
      return;
    }
    footer.dataset.styled = 'true';

    footer.style.backgroundColor = '#000000';
    footer.style.color = '#ffffff';
    footer.style.textAlign = 'center';
    footer.style.padding = '2rem 1.5rem 1.5rem 1.5rem';
    footer.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    footer.style.display = 'flex';
    footer.style.flexWrap = 'wrap';
    footer.style.justifyContent = 'space-between';
    footer.style.alignItems = 'center';
    footer.style.gap = '1rem';
    footer.style.marginTop = '2rem';
    footer.style.borderTop = '2px solid #000000';

    var paragraphs = footer.querySelectorAll('p');
    paragraphs.forEach(function (p) {
      p.style.margin = '0';
      p.style.padding = '0.25rem 0';
      p.style.color = '#ffffff';
    });

    var navs = footer.querySelectorAll('nav');
    navs.forEach(function (nav) {
      nav.style.display = 'flex';
      nav.style.flexWrap = 'wrap';
      nav.style.gap = '0.5rem';
      nav.style.padding = '0';
      nav.style.margin = '0';
      nav.style.backgroundColor = 'transparent';
      nav.style.border = 'none';
    });

    var links = footer.querySelectorAll('a');
    links.forEach(function (a) {
      if (a.dataset.styled === 'true') {
        return;
      }
      a.dataset.styled = 'true';

      a.style.color = '#ffffff';
      a.style.backgroundColor = 'transparent';
      a.style.textDecoration = 'underline';
      a.style.display = 'inline-block';
      a.style.padding = '0.3rem 0.75rem';
      a.style.borderBottom = '1px solid rgba(255, 255, 255, 0.3)';
      a.style.borderRadius = '0';
      a.style.transition = 'border-color 0.15s ease, color 0.15s ease';

      a.addEventListener('mouseenter', function () {
        a.style.borderBottomColor = '#ffffff';
      });

      a.addEventListener('mouseleave', function () {
        a.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
      });

      a.addEventListener('focus', function () {
        a.style.outline = '2px solid #ffffff';
        a.style.outlineOffset = '2px';
      });

      a.addEventListener('blur', function () {
        a.style.outline = 'none';
      });
    });
  }

  function styleAllFooters(root) {
    var scope = root || document;
    if (scope.nodeType === 1 && scope.tagName === 'FOOTER') {
      styleFooter(scope);
    }
    var footers = scope.querySelectorAll ? scope.querySelectorAll('footer') : [];
    footers.forEach(styleFooter);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      styleAllFooters(document);
    });
  } else {
    styleAllFooters(document);
  }

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) {
          return;
        }

        if (node.tagName === 'FOOTER') {
          styleFooter(node);
        } else if (node.querySelectorAll) {
          node.querySelectorAll('footer').forEach(styleFooter);
        }
      });

      if (mutation.type === 'childList' && mutation.target.tagName === 'FOOTER') {
        styleFooter(mutation.target);
      }
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

})();