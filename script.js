(function () {
  'use strict';

  /* --- mobile drawer ------------------------------------------------ */
  var toggle = document.querySelector('.menu-toggle');
  var drawer = document.getElementById('drawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      drawer.hidden = open;
      document.body.style.overflow = open ? '' : 'hidden';
    });

    drawer.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      toggle.setAttribute('aria-expanded', 'false');
      drawer.hidden = true;
      document.body.style.overflow = '';
    });
  }

  /* --- contact form ------------------------------------------------- */
  var form = document.getElementById('contact-form');

  if (form) {
    var status = document.getElementById('form-status');
    var rules = [
      { id: 'f-type',    err: 'e-type',    msg: 'お問い合わせ種別を選択してください。' },
      { id: 'f-name',    err: 'e-name',    msg: 'お名前を入力してください。' },
      { id: 'f-email',   err: 'e-email',   msg: 'メールアドレスを入力してください。' },
      { id: 'f-message', err: 'e-message', msg: 'ご相談内容を入力してください。' },
      { id: 'f-consent', err: 'e-consent', msg: 'プライバシーポリシーへの同意が必要です。' }
    ];

    function check(rule) {
      var el = document.getElementById(rule.id);
      var box = document.getElementById(rule.err);
      if (!el || !box) return true;

      var msg = '';
      if (el.type === 'checkbox') {
        if (!el.checked) msg = rule.msg;
      } else if (!el.value.trim()) {
        msg = rule.msg;
      } else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) {
        msg = 'メールアドレスの形式をご確認ください。';
      }

      box.textContent = msg;
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    }

    rules.forEach(function (rule) {
      var el = document.getElementById(rule.id);
      if (!el) return;
      el.addEventListener('blur', function () { check(rule); });
      el.addEventListener('change', function () {
        if (el.getAttribute('aria-invalid') === 'true') check(rule);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = null;
      rules.forEach(function (rule) {
        if (!check(rule) && !first) first = document.getElementById(rule.id);
      });

      if (first) {
        status.textContent = '';
        first.focus();
        return;
      }

      // 送信先は contact.html の <form data-endpoint="..."> で指定します。
      // Google Apps Script のウェブアプリURL（/exec で終わるもの）を貼ってください。
      var endpoint = form.getAttribute('data-endpoint') || '';
      if (endpoint.indexOf('http') !== 0) {
        status.className = 'form-status is-error';
        status.textContent = '入力内容に問題はありません。※送信先が未設定のため、実際には送信されていません。';
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var payload = {
        type:    document.getElementById('f-type').value,
        name:    document.getElementById('f-name').value.trim(),
        company: document.getElementById('f-company').value.trim(),
        email:   document.getElementById('f-email').value.trim(),
        tel:     document.getElementById('f-tel').value.trim(),
        message: document.getElementById('f-message').value.trim(),
        website: document.getElementById('f-website') ? document.getElementById('f-website').value : '',
        page:    location.href
      };

      if (btn) { btn.disabled = true; btn.textContent = 'SENDING...'; }
      status.className = 'form-status';
      status.textContent = '送信しています…';

      // Content-Type を text/plain にしているのは、プリフライト（OPTIONS）を
      // 発生させないためです。application/json にすると Apps Script 側が
      // OPTIONS に応答できず、CORSエラーになります。変更しないでください。
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data || !data.ok) throw new Error(data && data.error ? data.error : 'unknown');
          form.reset();
          status.className = 'form-status is-done';
          status.textContent = '送信しました。3営業日以内に担当者よりご連絡いたします。';
        })
        .catch(function () {
          status.className = 'form-status is-error';
          status.textContent = '送信に失敗しました。時間をおいて再度お試しいただくか、お手数ですがメールにてご連絡ください。';
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = 'SEND'; }
        });
    });
  }

  /* --- VIDEO セクションについて -------------------------------------
     以前は絞り込みと LOAD MORE を持つ動画一覧をここで制御していましたが、
     最新3件を手で並べる形に変えたため、関連するJSは削除しました。 */

  /* --- scroll reveal ------------------------------------------------ */
  var SELECTOR = '[data-r],[data-fade],[data-bar]';

  function elements() {
    return document.querySelectorAll(SELECTOR);
  }

  // Paint everything immediately, bypassing transitions. Used whenever the
  // animation timeline can't run (hidden tab, print, reduced motion).
  function showAll() {
    Array.prototype.forEach.call(elements(), function (el) {
      el.classList.add('in');
      el.style.opacity = '1';
      el.style.transform = el.hasAttribute('data-bar') ? 'scaleX(1)' : 'none';
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supported = 'IntersectionObserver' in window;

  if (reduced || !supported || document.visibilityState !== 'visible') {
    return; // .js-reveal is never added, so content stays visible by default
  }

  document.documentElement.classList.add('js-reveal');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
      setTimeout(function () { entry.target.classList.add('in'); }, delay);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });

  Array.prototype.forEach.call(elements(), function (el) { observer.observe(el); });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== 'visible') showAll();
  });
  window.addEventListener('beforeprint', showAll);
})();
