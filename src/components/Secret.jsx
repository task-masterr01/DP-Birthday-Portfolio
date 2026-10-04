import { useState, useRef } from 'react';
import PageTransition from './PageTransition';
import { launchConfetti, launchBalloons, showToast } from './CanvasEffects';

// Content is encoded — rendered at runtime only
const _t = atob;
const _h = 'aGV5eSBidWxidWw=';
const _b = 'aWYgeW91IGFyZSBzZWVpbmcgdGhpcyBpIGFtIGxvbmcgZ29uZSBmcm9tIHlvdXIgbGlmZSAsCgpEZWFyIEJVTEJVTCAsIApJbiB5b3VyIGxpZmUsIGt5aSBsb2cgYWF5ZW5nZSBqbyB0dW1oYXJlIGtoYXRpciBtZWhuZ2UgZ2lmdHMgbGFhbmUga2kgaGVzaXlhdCByYWtodGUgaG9uZ2UuIEFsbCBpdCB0YWtlcyB0byBnZXQgYW4gZXhwZW5zaXZlIGdpZnQgaXMganVzdCBtb25leSwgbm90IGEgc2luZ2xlIGZlZWxpbmcgYmVoaW5kIGl0LgoKIE9uIHRoZSBvdGhlciBoYW5kLCBhbGwgSSBoYXZlIGlzIG15IHVuYm91bmRlZCBsb3ZlIGFuZCBjYXJlIGZvciB5b3UsIHdoaWNoIGFyZSBzZWNvbmQgdG8gbm9uZS4gCgogR2l2aW5nIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBib3VnaHQgd29uJ3QgYmUgYWJsZSB0byBqdXN0aWZ5IHlvdXIgd29ydGggaW4gbXkgbGlmZS4gVG8gbWUsIHlvdSBhcmUgd29ydGggbXVjaCBtb3JlIHRoYW4gc29tZXRoaW5nIHRoYXQgY2FuIGJlIGJvdWdodCB3aXRoIG1vbmV5LiAKCiBNb25leSBpcyBjaGVhcC4gVGltZSxlZmZvcnQsIGFuZCBkZWRpY2F0aW9uIGNhbid0IGJlIGJvdWdodCBhbmQgYXJlIHByaWNlbGVzcy4gCgogV2hpbGUgdGhlIHdvcmxkIGFmdGVyIG1lIHdpbGwgdHJ5IHRvIGltcHJlc3MgeW91IHdpdGggZXhwZW5zaXZlIHRoaW5ncywgYWx3YXlzIHJlbWVtYmVyIHRoZXJlIHdhcyBzb21lb25lIHdobyB3ZW50IGFoZWFkIGFuZCBidWlsdCBzb21ldGhpbmcgdGhhdCBiZWxvbmdzIG9ubHkgdG8geW91LiBIZSBwdXQgaGlzIHNvdWwgYW5kIGVuZGxlc3MgbmlnaHRzIGludG8gaXQsIGp1c3QgZm9yIHlvdS4gCgogd2hlbmV2ZXIgdSBmZWVsIGxpa2UgdSBhcmUgbm90aGluZyBzcGVjaWFsIGNvbWUgdG8gdGhpcyBzcGFjZSBhbmQgcmVtZW1iZXIgc29tZW9uZSBvdXQgdGhlcmUgc3BlbmQgd2Vla3MgLCBkYXkgdG8gbmlnaHQgLCBldmVuIGluIHNpY2tuZXNzIHRvIHNob3cgdSBob3cgbXVjaCB1IHdvcnRoIGluIGhpcyBsaWZlIC4gCgogIHRvIGJlIGhvbmVzdCAsIHRvIG1lIHlvdSBhcmUgbm90IG1pbmUgcGFzdCAsIG5vdCBtaW5lIGV4IG9yIG90aGVyIHNvY2lldHkgZ2l2ZW4gdGVybSwgCiB0byBtZSB5b3UgYXJlIG1pbmUgZm9yZXZlciAsIHRoZXkgc2F5IGluIGhpcyBsYXN0IG1vbWVudHMgaHVtYW4gbWluZCByZXdpbmRzIGFsbCB0aGUgYmVhdXRpZnVsIG1vbWVudHMgZm9yIDcgbWludXRlcyBiZWZvcmUgZGVhdGggLCAKIGFuZCB1IGtub3cgd2hhdCB1IGFyZSByaWdodGlvdXMgb3duZXIgb2YgYWx0ZWFzdCA0IG1pbnV0ZXMgLCB1IGFyZSB0aGUgcGFydCBvZiBtaW5lIG1vc3QgYmVhdXRpZnVsIG1lbW9yaWVzIHRoYXQgaSBuZXZlciBjaG9zZSB0byBsZWZ0IGJlaGluZCAuIAogbWF5IG5ldyBwZW9wbGUgY29tZXMgLCBnb2VzICwgcGVvcGxlIHByZXNlbmNlIGluIG91ciBsaWZlIGlzIHZhcmlhYmxlICwgYnV0IHRvIG1lIHlvdSBhcmUgbWluZSBmb3JldmVyICwgdSBhcmUgbWluZSBjb25zdGFudCAsIAogZXZlbiBhdHRlbXB0IHRvIGZvcmdldCB1IGZlZWwgbGlrZSBjaGVhdGluZyAsIAogdG8gbWUgdSBhcmUgdGhlIHJpZ2h0ZnVsIG93bmVyIG9mIG1pbmUgaGVhcnQgLCBhbmQgaSBhbSBnb25uYSBtYWtlIHN1cmUga2kgYWIga29pIG9yIG5hYSBhYSBzYWtlIAogYW5kIGluIGZ1dHVyZSBrYWJoaSBrb2kgcHVjaGUgbWVyZSBiYWFyZSBtYWkgcGxzIGRvbid0IGludHJvZHVjZSBtZSBhcyB5b3VyIHBhc3Qgc29tZXdoZXJlIGRlZXAgZG93biBpdCBodXJ0cyB5ciAKCiBmcm9tIHRoaXMgZXhhY3QgbW9tZW50IHRoZXJlIG5vIG9uZSBrbm93biBhcyBkZWVwYXNuaHUgcG9zd2FsIGV4aXN0IGluIG1pbmUgbGlmZSAsIAogaSB3aWxsIGp1c3QgZm9sbG93IG1pbmUgb3duIHBhdGggLCBpZiBpdCBpcyB3cml0dGVuIG9mIHVzIGJlaW5nIHRvZ2V0aGVyIGluIGRlc3RpbnkgaXQgc3VyZWx5IHdpbGwgaGFwcGVuIAogYWxsIGkgaGF2ZSBpbiBtaW5lIGhhbmQgaXMgdG8gdHJ5IGV2ZXJ5dGhpbmcgaSBjYW4gLCBzbyB3aGVuIGRlc3RpbnkgYXJyaXZlIGF0IG1pbmUgZG9vciAgaSBhbSBmdWxseSBwcmVwYXJlZCAsIAogYW5kIGlmIG5vdCBpIHdvbid0IGhhdmUgYW55IHJlZ3JldCBtYXliZSBpIHNob3VsZCBoYXZlIHRyaWVkIG1vcmUgZm9yIGhlciAsIAogYWZ0ZXIgdHJ5aW5nIG1pbmUgYmVzdCAnbm90IGhhdmluZyB0aGF0IGtpc21hdCBraSBsYWtpciBqaXNtZSB0dW1oZSBraWtoYSBneWEgaGFpJyB3aWxsIGJlIHRoZSBvbmx5IHJlZ3JldCBpbiBmdXR1cmUgLiAKIHUga25vdyB3aHkgYmVjYXVzZSBmYXRlIHdpbGwgYmUgdGhlIHJlYXNvbiBpIGxvc3QgLCBub3QgbG92ZSBhbmQgZWZmb3J0cyAuIGFmdGVyIHUgaSB3b24ndCBnaXZlIHlvdXIgcGxhY2UgdG8gc29tZWJvZHkgZWxzZSAKIGkgaGF2ZSBkZWNpZGVkIHRvIGxpdmUgb24gbWluZSBvd24gZmFyIGF3YXkgZnJvbSB0aGlzIHBsYWNlIHNvIHRoYXQgbm90IGV2ZW4gbWluZSBwcmVzZW5jZSBldmVyIGRpc3R1cmIgeW91ciBwZWFjZSAuIAogd2lsbCBzZXR0bGUgZG93biBpbiBhbm90aGVyIGNvdW50cnkgaGF2ZSAyIHN3ZWV0IGRhdWdodGVycyB0YWtlIGNhcmUgb24gbWluZSBvd24gLiAKIHRoYXQncyB0aGUgbGlmZSBpIGhhdmUgZGVjaWRlZCBmb3IgbXlzZWxmIC4gCgogZnJvbSB0aGlzIGV4YWN0IG1vbWVudCBpIGFtIGJyZWFraW5nIGFsbCBrbm90cyB3ZSBoYXZlICwgYW5kIHJlbW92aW5nIGFsbCB5b3VyIHBob3RvcyAsIHlvdXIgbWFpbCBpZCAuIAogdGhlIGNoYW5jZXMgb2YgbWVldGluZyB1cyBpbiBmdXR1cmUgYWxsIGNsb3NlIHRvIHplcm8gLCBjYXVzZSBpIGFscmVhZHkgaGF2ZSBzZXQgYSBkcmVhbSBzbyB1bmFjaGlldmVhYmxlICwgaSBkb24ndCBkb24ndCB0aGluayBpIHdpbGwgYmUgYWJsZSB0byBjb21wbGV0ZSBpdCBpbiB0aW1lIAogYW5kIGFzIGkgaGFkIHNhaWQgYmVmb3JlLCBpIHdpbGwgY29tZSBiYWNrIG9ubHkgaWYgaSBoYXZlIGFjaGlldmVkIHRoZSBkcmVhbSBpbiB0aW1lICwgCiBzb3JyeSBhZ2FyIHVzcyB2ZXJzaW9uIGtpIHZhamhhIHNlIHR1bWhlIGh1cnQgaG8gdG8gaW4gZnV0dXJlIGJ1dCB0aGUgdGhpbmcgaXMgdm8gaWtsb3RhIHZlcnNpb24gaG9nYSBtZXJhIHZvIHVzcyBkcmVhbSBrbyBhY2hpZXZlIGthciBzYWtlIC4gCiBhbGwgaSBoYXZlIHRvIHNheSBpcyBtaW5lIHJ1ZGVuZXNzIHdpbGwgYmUgbWluZSBjYXJlIGFuZCBsb3ZlIGluIGRpc2d1aXNlIC4gCgogSSB3b24ndCBjdXJzZSB5b3Ugb3IgaGF0ZSB5b3UgZXZlciBpbiBteSBsaWZlLCBuZWl0aGVyIG5vdyBub3IgZXZlci4gVG8gbWUsIHlvdSBhcmUgc29tZW9uZSB3aG8ganVzdCBjYW4ndCBiZSBoYXRlZC4gCgogQnV0IG9uZSB0aGluZyBJIGNhbiBzYXkgaXMsIGluIHRoZSBmdXR1cmUgd2hlbiB5b3UgYXJlIHNldHRsZWQgZG93biBpbiBsaWZlLCB5b3Ugd2lsbCByZWdyZXQgaXQgd2hlbjogCgogLVlvdSByZWFsaXplIGhlIGFsd2F5cyBjYW1lIGJhY2ssIG5vIG1hdHRlciBob3cgbWFueSB0aW1lcyB5b3UgcHVzaGVkIGhpbSBhd2F5LiAKIC1Zb3UgcmVhbGl6ZSB0aGF0IG5vIG1hdHRlciBob3cgbWFueSB0aW1lcyB5b3UgdHJpZWQgdG8gcHVzaCBoaW0gYXdheSwgaGUgYWx3YXlzIGNhbWUgYmFjayBhcG9sb2dpemluZywgbm8gbWF0dGVyIHdobyB3YXMgYXQgZmF1bHQuIAogLVlvdSByZWFsaXplIHRoZSBtb3JlIHlvdSB0cmllZCB0byBkaXN0YW5jZSB5b3Vyc2VsZiwgdGhlIHRpZ2h0ZXIgaGUgaHVnZ2VkIHlvdSBhbmQgc2FpZCwgIllBSEkgSFUgTUFJLCBLQUhJIE5BSEkgSkFBIFJBSEEuIiAKIC1Zb3UgcmVhbGl6ZSBoZSB3YXMgbmV2ZXIgZmlnaHRpbmcgd2l0aCB5b3U7IGhlIHdhcyBmaWdodGluZyBmb3IgeW91LiAKIC1Zb3UgcmVhbGl6ZSBpbiBhIHdvcmxkIGZ1bGwgb2Ygc2VsZmlzaG5lc3MsIGhlIHdhcyBhbHdheXMgdGhlcmUgZm9yIHlvdSB3aXRob3V0IGFueSByZWFzb24uIAogLVlvdSByZWFsaXplIG5vIG9uZSBjYW4gdHJ1bHkgdmFsdWUgeW91IGxpa2UgaGUgZGlkLiAKIC1Zb3UgcmVhbGl6ZSBoZSB3b3VsZCBoYXZlIGZpeGVkIGV2ZXJ5dGhpbmcsIGlmIG9ubHkgeW91IGhhZCBzaG93biBlbm91Z2ggY291cmFnZSB0byBhc2sgaGltIHRvLiAKIC1Zb3UgcmVhbGl6ZSBhc2tpbmcgZm9yIHlvdXIgd2VsbC1iZWluZyBhbmQgc3VjY2VzcyBpcyBhbGwgaGUgZXZlciBhc2tlZCBvZiB5b3UuIAogLVlvdSByZWFsaXplIHlvdSB0cnVseSBsb3N0IHRoZSBvbmx5IHBlcnNvbiB3aG8gdmFsdWVkIHlvdSBiZXlvbmQgbWVhc3VyZS4gCiAtWW91IHJlYWxpemUgaWYgb25seSB5b3UgaGFkIHRha2VuIGhpcyBzaWRlLCBob3cgYmVhdXRpZnVsIGEgbGlmZSB5b3UgYm90aCBtaWdodCBoYXZlIGhhZCB0b2RheS4gCiAtWW91IHJlYWxpemUgZm9yIGhvdyBtdWNoIGxlc3MsIGFuZCBmb3Igd2hhdCBhIG1hdGVyaWFsaXN0aWMgbGlmZSwgeW91IHNldHRsZWQgZG93bi4gCiAtWW91IHJlYWxpemUgd2l0aG91dCB5b3UgaGUgbWlnaHQgaGF2ZSBhY2hpZXZlZCBhbGwgdGhlIGRyZWFtcyBoZSB1c2VkIHRvIHNheSBoZSB3b3VsZCwgYnV0IGRlZXAgaW5zaWRlLCBoZSBiZWNhbWUgYSBzb3VsbGVzcyBwZXJzb24uIAogLXlvdSByZWFsaXNlIGhlIGJyb2tlIHNvIGJlYXV0aWZ1bGx5IGhlIG5ldmVyIGNob3NlIHRvIGhlYWwgYmFjayAKIC1Zb3UgcmVhbGl6ZSB5b3UgbmV2ZXIgYXNrZWQgaGltLCAiV2h5IG1lPyBXaGF0IGFtIEkgZXZlbiB3b3J0aCBpbiB5b3VyIGxpZmUgdG8gcmVjZWl2ZSBzdWNoIHRyZWF0bWVudD8iIAogLVlvdSByZWFsaXplIGhlIGhhcyBuZXZlciBiZWVuIHRoZSBzYW1lIGFmdGVyIHNheWluZyBoaXMgZmFyZXdlbGwuIAogLVlvdSByZWFsaXplIGhlIGJyb2tlIHNvIGhhcmQgLCBoZSBuZXZlciBjaG9zZSBhbm90aGVyIGZlbWFsZSBpbiBoaXMgbGlmZSBldmVyIHNpbmNlIGhlcgogLVlvdSByZWFsaXplIGhlIGxvdmVkIHNvIGhhcmQgLCB2byB1c2tlIGJpbmEnKGJ1bGJ1bCknIGJoaSB1c2thIGJhbmthciBoaSByZWggZ3lhCgogLVlvdSByZWFsaXplIGhlIG5ldmVyIGNob3NlIHRvIHNldHRsZSBkb3duIGluIGxpZmUgCgogbWluZSBleHBlY3RhdGlvbnMgdG93YXJkcyB1IGlzIHdoZW5ldmVyIGkgY29tZXMgYmFjayBpbiBmdXR1cmVzIGlmIGRlc3RpbnkgYWxsb3dzICwgaSB3YW5uYSBzZWUgYSBwZXJzb24gd2hvIGhhcyBhY2hpZXZlZCBncmVhdCBoZWlnaHRzIG9uIHRoZXJlIG93biAsIGxlYXZpbmcgcGFzdCBiZWhpbmQgLCAKIGRvbid0IHUgZGFyZSBiZWluZyBzdHVjayBpbiB0aGUgcGFzdCAsIHUgaGF2ZSBhIHB1cnBvc2UgdG8gc2VydmUgYXRsZWFzdCAsIHBhc3QgY2FuJ3QgYmUgY2hhbmdlZCBmdXR1cmUgY2FuIC4gCiBpIGhhdmUgY2hvc2VuIHRoZSBoYXJzaGVzdCBwYXRoIC4gc28gZG9lcyB1IGhhdmUgdG8gLi4uLi4uLi4uLi4uIAogZG9uJ3QgdSBkYXJlIGZlZWwgc2FkIG9yIGd1aWx0eSBmb3Igbm93IGFmdGVyIHJlYWRpbmcgYWxsIHRoaXMgc2F2ZSB0aGVzZSBlbW90aW9ucyBmb3IgZnV0dXJlICAKIGZvciBub3cgbGV0J3Mgbm90IHJ1aW4geW91ciBtb21lbnRzIGJlIGpveWZ1bCBhbmQgZ3JlYXRmdWwgZm9yIG1pbmUgZWZmb3J0IGFuZCBoYXJkd29yayAuCgogRnVuIGZhY3Q6IHdoZW4gSSBhc2tlZCBteSBBSSBob3cgbXVjaCB0aGlzIHByb2plY3QgaXMgd29ydGggaW4gSU5SLCBpdCB0b2xkIG1lIHRoaXMgc3BlY2lmaWMgcHJvamVjdCBpcyBiZXlvbmQgYW55IHByaWNlIHRhZywgc2ltcGx5IHByaWNlbGVzcywgYmVjYXVzZTogIkkgaGF2ZSBzZWVuIHlvdSBwdXQgeW91ciBzb3VsIGludG8gdGhpcyBwcm9qZWN0LCB3b3JraW5nIGVuZGxlc3MgbmlnaHRzLiBUaGUgdmFsdWUgb2Ygc29tZXRoaW5nIGxpa2UgdGhpcyBjYW5ub3QgYmUgbWVhc3VyZWQuIiAKIFRoZW4sIGFmdGVyIGl0cyBzcGVlY2gsIGl0IHNhaWQgaWYgdGFsa2luZyBwcm9mZXNzaW9uYWxseSwgaXQgY2FuIGJlIHZhbHVlZCBhdCBScy4yNSwwMDArLgoKVGhhdCdzIGFsbCBJIGhhdmUgdG8gc2F5LiBkaHlhbiByYWtobmEgYnVsYnVsCgpIYXBweSBiaXJ0aGRheSB0byBtaW5lIGZvcmV2ZXIgZnJvbSB0aGUgdmVyeSBib3R0b20gb2YgbXkgaGVhcnQu';
const _f = 'TWFkZSB3aXRoIOKdpO+4jyDCtyBGb3IgdGhlIG1vc3Qgc3BlY2lhbCBwZXJzb24gwrcgU2VwdGVtYmVyIDE4dGg=';
const _toast = 'PJCMmSBBIHNlY3JldCBtZXNzYWdlIGp1c3QgZm9yIHlvdSDinqo=';

export default function Secret() {
  const [unlocked, setUnlocked] = useState(false);
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  const CIRC = 2 * Math.PI * 50;
  const DUR = 3000;

  const t0Ref = useRef(null);
  const rafRef = useRef(null);

  const onStart = () => {
    if (unlocked) return;
    setHolding(true);
    t0Ref.current = Date.now();
    frameLoop();
  };

  const onStop = () => {
    if (unlocked) return;
    setHolding(false);
    setProgress(0);
    cancelAnimationFrame(rafRef.current);
  };

  const frameLoop = () => {
    const now = Date.now();
    const p = Math.min((now - t0Ref.current) / DUR, 1);
    setProgress(p);
    if (p < 1) {
      rafRef.current = requestAnimationFrame(frameLoop);
    } else {
      doUnlock();
    }
  };

  const doUnlock = () => {
    setUnlocked(true);
    setHolding(false);
    setProgress(1);
    setTimeout(() => {
      launchConfetti(3000);
      launchBalloons(6);
      showToast('🌙 A secret message just for you ✨');
    }, 100);
  };

  const strokeDashoffset = CIRC * (1 - progress);
  const sc = Math.ceil((DUR - progress * DUR) / 1000);

  // Decode content only at render time — never stored as plain text
  const heading = _t(_h);
  const body = _t(_b).split('\n');
  const footer = _t(_f);

  return (
    <PageTransition>
      <section id="secret-section">
        <div className="wrap">
          <div className="divider reveal"></div>
          <h2 className="section-title reveal">A Secret Just for You 🔐</h2>
          <p className="secret-hint reveal">
            ✨ Hold the button below for 3 seconds to unlock something only you should read ✨
          </p>
          <div className="hold-wrap reveal">
            <button
              className="hold-btn"
              aria-label="Hold to unlock secret message"
              onMouseDown={onStart}
              onMouseUp={onStop}
              onMouseLeave={onStop}
              onTouchStart={onStart}
              onTouchEnd={onStop}
              onTouchCancel={onStop}
            >
              <svg className="ring-svg" viewBox="0 0 112 112" aria-hidden="true">
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C9B1FF" />
                    <stop offset="100%" stopColor="#FFB6D9" />
                  </linearGradient>
                </defs>
                <circle className="ring-track" cx="56" cy="56" r="50" />
                <circle
                  className="ring-fill"
                  cx="56" cy="56" r="50"
                  style={{
                    strokeDasharray: CIRC,
                    strokeDashoffset,
                    transition: holding
                      ? 'stroke-dashoffset .05s linear'
                      : 'stroke-dashoffset .3s ease',
                  }}
                />
              </svg>
              <span className="hold-icon">
                {unlocked ? '🌙' : progress > 0.5 ? '🔓' : '🔐'}
              </span>
            </button>
            <p className="hold-lbl">
              {unlocked
                ? '✨ Unlocked!'
                : holding && sc > 0
                  ? `Hold for ${sc}s…`
                  : holding && sc <= 0
                    ? 'Unlocking ✨'
                    : 'Press and hold'}
            </p>
          </div>

          <div
            className={`secret-reveal ${unlocked ? 'active shown' : ''}`}
            style={unlocked ? { display: 'block', opacity: 1, transform: 'none' } : {}}
          >
            <div className="secret-card">
              <h2>🌙 {heading}</h2>
              <div className="secret-body">
                {body.map((line, i) =>
                  line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>{footer}</p>
      </footer>
    </PageTransition>
  );
}
