/* WordUp browser push. Keep provider secrets out of this public file. */
(() => {
  "use strict";
  const CONFIG = { oneSignalAppId: "6b3897fc-6317-4768-85e4-c104893b3660", pushWorkerUrl: "https://wordup-push.suliman-7surkhrody.workers.dev" };
  const configured = () => CONFIG.oneSignalAppId !== "ADD_ONESIGNAL_APP_ID" && /^[-a-f0-9]{30,40}$/i.test(CONFIG.oneSignalAppId);
  let ready = false, OneSignalRef = null;
  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  const setButton = (value, disabled) => { const el = document.getElementById("wuPushEnable"); if (el) { el.textContent = value; el.disabled = !!disabled; } };
  function status(value) { setText("wuPushStatus", value); setText("wuPushDescription", value); }
  async function refresh() {
    if (!ready || !OneSignalRef) return;
    try {
      const optedIn = !!OneSignalRef.User?.PushSubscription?.optedIn;
      if (optedIn) { status("You are subscribed! WordUp can now send occasional learning reminders."); setButton("Notifications enabled", true); }
      else if (Notification.permission === "denied") { status("Notifications are blocked in your browser settings. Allow them there if you want WordUp reminders."); setButton("Blocked in browser", true); }
      else { status("Notifications are optional. Turn them on to receive learning reminders."); setButton("Enable notifications", false); }
    } catch (e) { console.warn("WordUp subscription status:", e); }
  }
  function init() {
    if (!configured()) { status("Notifications are being prepared. The WordUp team will activate subscriptions soon."); setButton("Coming soon", true); return; }
    if (!("Notification" in window) || !("serviceWorker" in navigator)) { status("This browser does not support web push. Try an updated Chrome or Edge browser."); setButton("Not supported", true); return; }
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function (OneSignal) {
      try {
        await OneSignal.init({ appId: CONFIG.oneSignalAppId, serviceWorkerPath: "/wordup/service-worker.js", serviceWorkerParam: { scope: "/wordup/" }, notifyButton: { enable: false } });
        OneSignalRef = OneSignal; ready = true; await refresh();
      } catch (e) { console.error("WordUp push initialization:", e); status("Notifications could not start. Refresh the page and try again later."); setButton("Try again later", true); }
    });
    const sdk = document.createElement("script"); sdk.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"; sdk.async = true;
    sdk.onerror = () => { status("The notification service could not be reached. Check your connection."); setButton("Try again later", true); };
    document.head.appendChild(sdk);
  }
  window.wordUpEnableNotifications = async function () {
    if (!ready || !OneSignalRef) { status("Notifications are not activated yet. Please check back soon."); return; }
    setButton("Enabling…", true);
    try { await OneSignalRef.Notifications.requestPermission(); if (Notification.permission === "granted") { await OneSignalRef.User.PushSubscription.optIn(); status("Thanks for subscribing! Look out for friendly WordUp learning reminders."); } else { status("No problem. You can enable notifications later in browser settings."); } }
    catch (e) { console.error("WordUp permission request:", e); status("We could not enable notifications. Please try again from browser settings."); }
    await refresh();
  };
  window.wordUpSendPushBroadcast = async function () {
    const title = document.getElementById("wuPushAdminTitleInput")?.value.trim();
    const message = document.getElementById("wuPushAdminMessage")?.value.trim();
    const tokenInput = document.getElementById("wuPushAdminToken"), token = tokenInput?.value.trim();
    const output = document.getElementById("wuPushAdminStatus"), button = document.getElementById("wuPushSend");
    if (!title || !message || !token) { if (output) output.textContent = "Enter a title, message, and private sending token."; return; }
    if (CONFIG.pushWorkerUrl === "ADD_CLOUDFLARE_WORKER_URL" || !/^https:\/\//i.test(CONFIG.pushWorkerUrl)) { if (output) output.textContent = "The secure sending service is not configured. Follow PUSH-NOTIFICATIONS.md."; return; }
    if (button) button.disabled = true; if (output) output.textContent = "Sending to subscribed learners…";
    try {
      const response = await fetch(CONFIG.pushWorkerUrl.replace(/\/$/, "") + "/send", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token }, body: JSON.stringify({ title, message }) });
      const result = await response.json().catch(() => ({})); if (!response.ok) throw new Error(result.error || "Push service returned HTTP " + response.status);
      if (output) output.textContent = Number(result.recipients || 0) > 0 ? "Notification sent to " + result.recipients + " subscribed device(s)." : "Request accepted, but the provider reports no subscribed recipients yet.";
      if (tokenInput) tokenInput.value = "";
    } catch (e) { console.error("WordUp push broadcast:", e); if (output) output.textContent = "Could not send: " + e.message; }
    finally { if (button) button.disabled = false; }
  };
  document.addEventListener("DOMContentLoaded", init);
})();