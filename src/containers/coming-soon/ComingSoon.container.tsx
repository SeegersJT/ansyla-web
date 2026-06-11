const socialLinks = [
  { label: 'Instagram', icon: 'ti-brand-instagram', href: 'https://www.instagram.com/ansylajewels' },
]

function ComingSoonContainer() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-background">

        {/* Brand */}
        <span className="font-serif text-5xl font-semibold tracking-[0.25em] text-gradient-gold">
            ANSYLA
        </span>

        <span className="text-2xl uppercase tracking-luxe text-muted-foreground">
            Jewels
        </span>

      {/* Ornament */}
      <p className="text-[10px] tracking-[0.5em] text-muted-foreground/40 mb-8 select-none">
        ◆ &nbsp; ◇ &nbsp; ◆ &nbsp; ◇ &nbsp; ◆
      </p>

      <div className="w-12 h-px bg-muted-foreground/30 mb-10" />

      {/* Headline */}
      <h1 className="font-serif text-[28px] font-normal tracking-wide text-foreground text-center mb-4">
        Something beautiful is coming
      </h1>
      <p className="text-sm font-light text-muted-foreground text-center max-w-sm leading-relaxed tracking-wide mb-12">
        We're putting the finishing touches on our new collection. Our site will
        be ready soon - follow us to be the first to know when we launch.
      </p>

      {/* Social */}
      <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">
        Follow us
      </p>
      <div className="flex gap-3 mb-12">
        {socialLinks.map(({ label, icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm bg-card text-foreground text-xs tracking-widest uppercase hover:border-foreground/40 transition-colors"
          >
            <i className={`ti ${icon} text-base`} aria-hidden="true" />
            {label}
          </a>
        ))}
      </div>

      <p className="mt-14 text-[11px] text-muted-foreground/60 tracking-wide">
        © {new Date().getFullYear()} Ansyla Jewels &nbsp;·&nbsp; Coming soon
      </p>
      <p className="mt-2 text-[11px] text-muted-foreground/60 tracking-wide">
        Created by <a target="_blank" href="https://seegers.net.za/" rel="noopener noreferrer">Hanno Seegers</a>
      </p>

       
    </div>
  )
}

export default ComingSoonContainer