export default function Footer() {
  return (
    <footer className="surface-paper border-t border-[color:var(--color-border)]">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12 grid gap-8
                      md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow mb-4">In partnership with</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[color:var(--color-ink)]
                          font-serif text-xl leading-tight">
            <span>Taleemabad</span>
            <span className="text-slate-warm">·</span>
            <span>Mulago Foundation</span>
            <span className="text-slate-warm">·</span>
            <span>Khoj Resort</span>
          </div>
        </div>

        <div className="text-sm text-slate-warm md:text-right">
          <p>Summit Fellowship · Skardu, Gilgit-Baltistan · June 2026</p>
          <p className="mt-1">
            <a href="mailto:info@summitweb.com" className="hover:text-terra-red transition-colors">
              info@summitweb.com
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border)]">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row
                        justify-between gap-2 text-xs text-slate-warm">
          <p>© 2026 Summit Fellowship. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-terra-red transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-terra-red transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
